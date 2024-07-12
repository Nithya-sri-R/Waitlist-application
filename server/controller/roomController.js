import dotenv from 'dotenv'; // Import dotenv directly
import nodemailer from "nodemailer";
import { emailConfig } from "../config/nodemailer.js";
import Room from "../model/Room.js";
import User from "../model/User.js";

// Configure dotenv to load environment variables
dotenv.config();

// Register the user for the iPhone 14
const joinRoom = async (req, res) => {
  try {
    // Protected route gets user from the middleware
    const { email } = req.user;

    // Getting the referral code sent by user
    const { referral } = req.body;

    if (referral && referral.length > 0) {
      console.log("Checking referral code");
      await verifyCode(referral);
    }

    const randomCode = generateReferral(6);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { joinedRoom: true, referralCode: randomCode },
      { new: true }
    );

    if (!updatedUser) {
      console.error("User not found or update failed");
      return res.status(404).json({ error: "User not found or update failed" });
    }

    let isRoom = await Room.findOne({ name: "LeaderBoard" }).populate({
      path: "users.user",
      model: "User",
    });

    let position = 99;
    let updatedRoom = {};

    if (isRoom) {
      position += isRoom.users.length + 1;

      updatedRoom = await Room.findOneAndUpdate(
        { name: "LeaderBoard" },
        { $push: { users: { user: updatedUser._id, position: position + 1 } } },
        { new: true }
      );
    } else {
      await Room.create({ name: "LeaderBoard", users: [] });

      updatedRoom = await Room.findOneAndUpdate(
        { name: "LeaderBoard" },
        { $push: { users: { user: updatedUser._id, position: position + 1 } } },
        { new: true }
      );
    }

    if (!updatedRoom) {
      console.error("Room update or creation failed");
      return res.status(500).json({ error: "Room update or creation failed" });
    }

    return res.status(200).json({
      message: "Joined the room",
      room: updatedRoom,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in joinRoom:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get the updated leaderboard
const getScores = async (req, res) => {
  try {
    const scores = await Room.findOne({ name: "LeaderBoard" }).populate({
      path: "users",
      populate: { path: "user", model: "User" },
    });

    if (!scores) {
      return res.status(404).json({ message: "Leaderboard not found" });
    }

    return res.status(200).json({ scores });
  } catch (err) {
    console.error("Error in getScores:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Generate random referral code for new user
const generateReferral = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWZYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Checks referral code -> calls updateLeaderBoard -> sends email
const verifyCode = async (code) => {
  try {
    let leaderBoardCollection = await Room.findOne({ name: "LeaderBoard" }).populate({
      path: "users",
      populate: {
        path: "user",
        model: "User",
      },
    });
    let leaderboard = leaderBoardCollection.users;

    leaderboard.map(async (item, index) => {
      if (item.user.referralCode === code) {
        let start = index - 10;
        let end = index - 1;
        let insertItem = item;
        let insertIndex = index;
        let currentPosition = item.position;

        // Give the user 10 points and change the leaderboard
        let updatedLeaderBoard = await updateLeaderBoardHandler(
          start,
          end,
          leaderboard,
          insertItem,
          insertIndex,
          currentPosition
        );

        if (!updatedLeaderBoard) {
          console.log("Error in updating leaderboard");
          return;
        }

        // Save the updated one to the database
        let newLeaderBoard = await Room.updateOne(
          { name: "LeaderBoard" },
          { users: updatedLeaderBoard },
          { new: true }
        );

        console.log("Referred user got 10 points");

        if (item.position <= 1) {
          // Send email to the user
          await emailHandler(item.user.email, item.user.name);
        }
      }
    });
  } catch (error) {
    console.log("Error in rewards", error);
    return error;
  }
};

// Updates the leaderboard, changes the position and gives reward to referred user
const updateLeaderBoardHandler = async (
  start,
  end,
  leaderboard,
  insertItem,
  insertIndex,
  currentPosition
) => {
  try {
    if (start >= 0) {
      leaderboard.map((item, index) => {
        if (index >= start && index <= end) {
          item.position += 1;
        }
      });
    }
    insertItem.position -= 1;

    leaderboard[insertIndex] = insertItem;

    function compare(a, b) {
      const compareA = a.position;
      const compareB = b.position;
      let compare = 0;
      if (compareA > compareB) {
        compare = 1;
      } else if (compareA < compareB) {
        compare = -1;
      }
      return compare;
    }

    leaderboard = leaderboard.sort(compare);
    console.log("Leaderboard updated");
    return leaderboard;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Sends email to the referred user
const emailHandler = async (to, name) => {
  try {
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject: "25% Offer",
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
    console.log("Email sent to winner", info);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getScores, joinRoom };

