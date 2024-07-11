import nodemailer from 'nodemailer';
import { emailConfig } from '../config/nodemailer.js';
import OTP from '../model/OTP.js';
import User from '../model/User.js';

// Create OTP
const createOtp = async (req, res, next) => {
  try {
    // Generate a random OTP
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Create OTP record in the database
    const createdOTP = await OTP.create({
      email: req.user.email,
      otp: randomNumber,
    });

    // Store OTP in req object for later use if needed
    req.otp = createdOTP.otp;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error creating OTP:', error);
    return res.status(500).json({ error: 'Failed to create OTP' });
  }
};

// Send Email
const sendEMail = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(400).json({ error: 'User email not provided' });
    }

    // Create Nodemailer transporter using configuration from emailConfig
    const transporter = nodemailer.createTransport(emailConfig);

    // Email options (to, from, subject, html body)
    const mailOptions = {
      from: process.env.EMAIL, // Sender's email address
      to: req.user.email, // Recipient's email address (ensure req.user.email is valid)
      subject: 'Your OTP for Verification',
      html: `
        <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
          <div style="margin: 50px auto; width: 70%; padding: 20px 0">
            <div style="border-bottom: 1px solid #eee">
              <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">iPhone 14 Registration</a>
            </div>
            <p style="font-size: 1.1em">Hi, ${req.user.name}</p>
            <p>Use the following OTP to complete the verification process. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${req.otp}</h2>
            <p style="font-size: 0.9em;">Regards,<br />iPhone 14 Registration Team</p>
            <hr style="border: none; border-top: 1px solid #eee" />
            <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
              <p>Realtime Waiting List</p>
              <p>Nithya Sri R</p>
              <a href="https://github.com/Nithya-sri-R">GitHub profile</a>
            </div>
          </div>
        </div>`,
    };

    // Send email using transporter
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.response);
    return res.status(201).json({ message: 'You should receive an email', email: info.response });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(400).json({ error: 'User email not provided' });
    }

    const { email } = req.user;
    let { otp } = req.body;
    otp = Number(otp);

    // Find the OTP record for the user's email
    const otpRecord = await OTP.findOne({ email, otp });

    if (otpRecord) {
      console.log('OTP verified, updating the user to verified user');
      
      // Update user's verification status to true
      await User.findOneAndUpdate({ email }, { verified: true });

      // Fetch updated user details
      let user = await User.findOne({ email });

      // Return success response with user details
      return res.status(200).json({ message: 'User verified', user });
    }

    // Return error if OTP not found or invalid
    return res.status(404).json({ error: 'OTP not found or invalid' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

export { createOtp, sendEMail, verifyOtp };

