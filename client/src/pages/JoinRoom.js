import React from "react";
import { useNavigate } from "react-router-dom";
import Otp from "../components/Otp";
import Referral from "../components/Referral";
import { UserState } from "../context/UserProvider";

const JoinRoom = ({ socket }) => {
  const { user } = UserState();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-screen w-full bg-[#f3e8ff]">
      <p
        onClick={() => navigate(-1)}
        className="text-4xl mt-14 cursor-pointer"
      >
        <span>
          <i className="fa-solid fa-angle-left"></i>
        </span>
        Home
      </p>
      {user && user.verified ? (
        user.joinedRoom ? (
          navigate("/leader-board") // Redirect to leader-board if the user has already joined a room
        ) : (
          <Referral socket={socket} /> // Show the referral component if the user has not joined a room
        )
      ) : (
        <Otp />
      )}
    </div>
  );
};

export default JoinRoom;
