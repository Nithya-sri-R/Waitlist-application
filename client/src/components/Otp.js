import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserState } from '../context/UserProvider';
import otpImg from '../utils/oottpp.png';
import CountDown from './CountDown';

const Otp = () => {
  const { token, setUser } = UserState();
  const validateOTPbutton = useRef();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const [userOTP, setUSerOTP] = useState('');

  useEffect(() => {
    const handleVerification = async () => {
      setVerifying(true);
      console.log('Sending OTP');

      try {
        const config = {
          headers: { Authorization: 'Bearer ' + token },
          withCredentials: true,
        };

        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get-otp`, config);
        console.log('OTP sent successfully');
      } catch (error) {
        console.error('Error sending OTP:', error);
        setVerifying(false);
        setUSerOTP('');
        toast.error('Failed to send OTP. Please try again.');
      }
    };

    // Automatically send OTP on component mount
    handleVerification();

    return () => {
      // Cleanup function if needed
    };
  }, [token]);

  const verifyOTP = async (e) => {
    e.preventDefault();
    
    if (userOTP) {
      console.log('Verifying OTP:', userOTP);

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/user/verify-otp`,
          { otp: userOTP },
          config
        );

        if (response.data && response.data.user) {
          const updatedUser = response.data.user;
          toast.success('Email verified');
          setUser(updatedUser);
          navigate('/join-room'); // Redirect to homepage or another route upon successful verification
        } else {
          toast.error('Failed to verify OTP. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        toast.error('Failed to verify OTP. Please try again.');
      } finally {
        setVerifying(false);
        setUSerOTP('');
      }
    }
  };

  return (
    <div className="w-full sm:w-[90%] max-w-md flex-1 sm:h-[80%] pb-4 mb-16 sm:mb-5 sm:rounded-lg sm:shadow-lg flex flex-col justify-start items-center">
      <img
        className="h-[30%] px-5 ml-auto mr-auto mt-10"
        src={otpImg}
        alt="OTP"
      />
      <div className="w-[90%] flex-1 flex flex-col items-center p-5 sm:p-2 gap-3">
        <p className="text-2xl font-thin">Verification</p>
        <p className="font-thin">
          You will get an <span className="font-bold underline">OTP</span> via email
        </p>

        {verifying ? (
          <CountDown
            resendOTP={() => {}}
            setVerifying={setVerifying}
            verifying={verifying}
            time={10} // Set the countdown time to 10 seconds
          />
        ) : (
          <p className="font-thin">
            Expires in: <span className="font-bold text-red-500">00:10</span> seconds
          </p>
        )}

        <form className="flex flex-col h-full justify-start gap-5 items-center mt-10">
          <input
            className="w-full text-center rounded-xl bg-gray-100 focus:border-[0.5px] border-solid border-gray-400"
            type="text"
            value={userOTP}
            onChange={(e) => setUSerOTP(e.target.value)}
            placeholder="Enter the OTP"
            required
          />
          <button
            ref={validateOTPbutton}
            type="submit"
            onClick={verifyOTP}
            className="w-[80%] p-3 bg-[#1C658C] rounded-xl font-bold text-white"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
