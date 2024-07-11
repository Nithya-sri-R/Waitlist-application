import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import iphone from "../utils/iphone.png";
import './HomePage.css';

const HomePage = () => {
  const { token, setUser, user } = UserState();
  const navigate = useNavigate();
  const [slide, setSlide] = useState(false);

  const getInfo = async (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get-info`, config);
      const { user } = response.data;
      setUser(user);

      if (!user.joinedRoom) {
        setSlide(true);
        setTimeout(() => navigate("/early-register"), 1000);
      }
    } catch (err) {
      localStorage.removeItem("signedJWT");
      console.log("Invalid JWT, user not authenticated");
      navigate("/");
    }
  };

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("signedJWT"));
    if (storedToken) {
      getInfo(storedToken);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      getInfo(token);
    }
  }, [token]);

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin-dashboard"); // Redirect to Admin Dashboard if user is an admin
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <div className={`background ${slide ? 'slide-out' : 'slide-in'}`}>
        <div className="bg-yellow-100 h-[100vh] w-[100vw] flex items-center justify-center sm:p-5 md:p-10">
          <div className="h-[100vh] w-[100vw] bg-yellow overflow-x-hidden relative flex flex-col">
            <img src={iphone} className="object-contain w-[60%] h-[70%] sm:w-[100%] sm:h-[-100%] absolute top-[15%] left-[-1000%] sm:left-[-900%] md:left-[-10%]" />
          </div>
          <div className="mt-[-10%] w-[100%] flex-1 flex justify-center items-center">
            {user && (
              <div className="mt-[10%] md:mt-[7%] sm:mx-[10%] z-10 relative">
                {!user.joinedRoom && (
                  <p className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
                    <Link to="/early-register"> Register</Link>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </p>
                )}
                {user.joinedRoom && (
                  <div className="flex justify-center items-center h-screen">
                    <p className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">
                      <Link to="/leader-board">Leaderboard</Link>
                      <i className="fa-solid fa-chevron-right"></i>
                    </p>
                  </div>
                )}
                {user.winner && (
                  <p className="text-2xl cursor-pointer sm:text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600">
                    <Link to="/reedem-coupons"> Coupons</Link>
                    <i className="fa-solid fa-chevron-right"></i>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
