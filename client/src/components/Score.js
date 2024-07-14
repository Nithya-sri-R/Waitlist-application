import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";

const Score = ({ socket }) => {
  const { user, token } = UserState();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    socket.on("updated-leaderboard", (leaderboard) => {
      setLeaderboard(removeDuplicates(leaderboard.users));
    });

    getScores();
  }, [socket]);

  const getScores = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/room/get`,
        config
      );

      setLeaderboard(removeDuplicates(response.data.scores.users));
    } catch (error) {
      console.error("Error fetching leaderboard data", error.message);
    }
  };

  const removeDuplicates = (users) => {
    const seenEmails = new Set();
    return users.filter((item) => {
      if (item.user && seenEmails.has(item.user.email)) {
        return false;
      }
      if (item.user) {
        seenEmails.add(item.user.email);
      }
      return true;
    });
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    console.log("Copied", text);
  };

  const shareReferralCode = (text) => {
    if (navigator.share) {
      navigator.share({
        title: "Referral Code",
        text: `Use my referral code: ${text}`,
        url: window.location.href,
      })
      .then(() => console.log("Referral code shared successfully"))
      .catch((error) => console.error("Error sharing referral code", error));
    } else {
      console.log("Share API not supported in this browser");
    }
  };

  const userEntry = leaderboard.find((item) => item.user && item.user.email === user.email);

  return (
    <div className="flex flex-col items-center justify-start h-[100vh] w-[100vw] gap-5 bg-light-purple">
      <p
        className="text-4xl mt-5 cursor-pointer text-blue-900"
        onClick={() => {
          navigate(-1);
        }}
      >
        <span>
          <i className="fa-solid fa-angle-left mr-3"></i>
        </span>
        Leaderboard
      </p>
      <div className="flex flex-col items-center justify-between w-[100%] mt-5 max-w-lg h-[100%]">
        <div className="flex flex-col h-[65%] w-[90%] bg-white shadow-lg rounded-lg overflow-auto">
          <ul className="w-[100%] flex flex-col gap-2 p-4">
            {leaderboard.slice(0, 10).map((item, index) => (
              <li
                key={item._id}
                className={`${
                  item.user && item.user.email === user.email
                    ? "bg-yellow-300"
                    : "bg-orange-200"
                } w-[100%] px-5 py-2 rounded-lg flex justify-start gap-[10%]`}
              >
                <span className="font-bold">#{index + 1}</span>
                <span className="font-bold">
                  {item.user ? item.user.name : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {userEntry && (
          <div className="flex flex-col w-[90%] h-[30%] max-w-lg cursor-pointer">
            <div className="flex flex-col items-center justify-center border-3 rounded-lg shadow-lg mb-4 bg-orange-600 p-5">
              <p className="text-lg font-bold text-orange-200">
                Your code{" "}
                <span className="font-extrabold">
                  {userEntry.user.referralCode}
                </span>
              </p>
              <div className="flex gap-4 mt-3">
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
                  onClick={() => copyToClipboard(userEntry.user.referralCode)}
                >
                  Copy to Clipboard
                </button>
                <button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
                  onClick={() => shareReferralCode(userEntry.user.referralCode)}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center mt-4">
          <ul className="text-blue-900">
            <li>Offer on the iPhone 15 for 1st position</li>
            <li>Earn 1 position forward on each referral</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Score;
