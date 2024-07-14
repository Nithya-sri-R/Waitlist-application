import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import referralImg from "../utils/download.png";

const Referral = ({ socket }) => {
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false);

  const { token, setUser } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message =
        "Are you sure you want to leave? All provided data will be lost.";
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
        withCredentials: true, // Ensure this is set
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/room/join`,
        { referral: referral },
        config
      );

      if (response.status === 200) {
        setUser(response.data.user);
        console.log("User updated:", response.data.user);

        socket.emit('update-leaderboard', "send me the updated leaderboard");
        navigate("/leader-board"); // Navigate back after successful registration
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error submitting referral code:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReferral = (e) => {
    setReferral(e.target.value);
  };

  return (
    <div className="w-full sm:w-90% max-w-md flex-1 sm:h-80% pb-4 mb-16 sm:mb-5 sm:rounded-lg sm:shadow-lg flex flex-col justify-start items-center">
      <img className="h-30% ml-10 mt-10" src={referralImg} alt="Referral Image" />
      <div className="w-90% flex-1 flex flex-col items-center p-5 sm:p-2 gap-3">
        <form
          onSubmit={handleSubmission}
          className="flex flex-col h-full justify-start gap-5 items-center mt-10"
        >
          <label htmlFor="referralInput">Do you have a referral code?</label>
          <input
            id="referralInput"
            type="text"
            placeholder="Enter a referral code"
            className="w-full login-input"
            value={referral}
            onChange={handleReferral}
          />
          <div className="flex items-center gap-2 mt-2 w-full">
            <div className="w-45% h-0.5px bg-yellow-500/50"></div>
            <p>OR</p>
            <div className="w-45% h-0.5px bg-yellow-500/50"></div>
          </div>

          <p>Continue without referral code</p>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-400 text-white text-lg px-5 py-1 rounded-lg"
          >
            Register Soon!!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Referral;
