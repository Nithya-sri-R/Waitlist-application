import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Time to live schema for storing OTP and verifying the entered OTP
const UserOTPSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    otp: {
      type: Number,
      required: true
    },
    // 5 min expiry
    expireAt: { type: Date, default: () => Date.now() + 5 * 60 * 1000 },
  },
  { timestamps: true }
);

const OTP = model('OTP', UserOTPSchema);
export default OTP;
