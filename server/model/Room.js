// model/Room.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Schema to store the ranks list and update the leaderboard in real-time
const RoomSchema = new Schema(
  {
    name: {
      type: String,
      default: 'LeaderBoard',
    },
    users: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        position: {
          type: Number,
          default: 100,
        },
      },
    ],
  },
  { timestamps: true }
);

const Room = model('Room', RoomSchema);
export default Room;
