import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { emailConfig } from '../config/nodemailer.js';
import Room from '../model/Room.js';
import User from '../model/User.js';

dotenv.config();

const joinRoom = async (req, res) => {
  try {
    const { email } = req.user;
    const { referral } = req.body;

    // Check if referral code is provided
    if (referral && referral.length > 0) {
      console.log('Checking referral code');
      await verifyCode(referral);
    }

    // Generate a random referral code for the new user
    const randomCode = generateReferral(6);

    // Update the user's joinedRoom status and referral code
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { joinedRoom: true, referralCode: randomCode },
      { new: true }
    );

    if (!updatedUser) {
      console.error('User not found or update failed');
      return res.status(404).json({ error: 'User not found or update failed' });
    }

    // Find the LeaderBoard room
    let room = await Room.findOne({ name: 'LeaderBoard' });

    if (!room) {
      room = await Room.create({ name: 'LeaderBoard', users: [] });
    }

    // Find the maximum position in the leaderboard
    const maxPosition = room.users.reduce((max, user) => Math.max(max, user.position), 98);
    const position = maxPosition + 1;

    // Check if the user already exists in the leaderboard
    const existingUserIndex = room.users.findIndex(user => user.user.toString() === updatedUser._id.toString());
    if (existingUserIndex === -1) {
      room.users.push({ user: updatedUser._id, position: position });
      await room.save();
    }

    return res.status(200).json({
      message: 'Joined the room',
      room,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error in joinRoom:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getScores = async (req, res) => {
  try {
    const scores = await Room.findOne({ name: 'LeaderBoard' }).populate({
      path: 'users.user',
      model: 'User',
    });

    if (!scores) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }

    return res.status(200).json({ scores });
  } catch (err) {
    console.error('Error in getScores:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const generateReferral = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWZYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const verifyCode = async (code) => {
  try {
    let leaderBoardCollection = await Room.findOne({ name: 'LeaderBoard' }).populate({
      path: 'users.user',
      model: 'User',
    });
    let leaderboard = leaderBoardCollection.users;

    // Find the user who referred the new user
    let referrerIndex = leaderboard.findIndex(user => user.user.referralCode === code);
    if (referrerIndex !== -1) {
      let referrer = leaderboard[referrerIndex];

      // Improve the referrer's position by 1
      referrer.position -= 1;

      // Ensure the referrer's new position is valid (cannot be less than 1)
      if (referrer.position < 1) {
        referrer.position = 1;
      }

      // Adjust the position of the user who was previously in the new position of the referrer
      for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i].position === referrer.position && i !== referrerIndex) {
          leaderboard[i].position = referrer.position + 1;
          break;
        }
      }

      // Check for duplicate positions and correct them
      let positions = {};
      leaderboard.forEach(user => {
        if (positions[user.position]) {
          // Find the next available position
          let newPosition = user.position + 1;
          while (positions[newPosition]) {
            newPosition += 1;
          }
          user.position = newPosition;
        }
        positions[user.position] = true;
      });

      // Sort the leaderboard based on the new positions
      leaderboard.sort((a, b) => a.position - b.position);

      // Save the updated leaderboard
      await Room.updateOne(
        { name: 'LeaderBoard' },
        { users: leaderboard }
      );

      console.log('Referrer position updated and duplicates corrected');
    }
  } catch (error) {
    console.log('Error in rewards', error);
    return error;
  }
};

const emailHandler = async (to, name) => {
  try {
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: '25% Offer',
      html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Early Registration iPhone 14</a>
            </div>
            <p style="font-size:1.1em">Hi, ${name}</p>
            <p>Congratulations, you've won an iPhone 14!</p>
            <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Realtime Waiting List</p>
              <p>Nithya_Sri</p>
              <a href="https://github.com/Nithya-sri-R">GitHub Profile</a>
            </div>
          </div>
        </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to winner', info);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getScores, joinRoom };
