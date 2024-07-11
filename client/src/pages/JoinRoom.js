import React from "react";
import { useNavigate } from "react-router-dom";
import Otp from "../components/Otp";
import Referral from "../components/Referral";
import { UserState } from "../context/UserProvider";

const JoinRoom = ({ socket }) => {
  const { user } = UserState();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-gap gap-10 h-full w-full bg-slate-100">
      <p
        onClick={() => navigate(-1)}
        className="text-4xl mt-14 cursor-pointer"
      >
        <span>
          <i className="fa-solid fa-angle-left"></i>
        </span>
        Home
      </p>
      {user && user.verified ? <Referral socket={socket} /> : <Otp />}
    </div>
  );
};

export default JoinRoom;
