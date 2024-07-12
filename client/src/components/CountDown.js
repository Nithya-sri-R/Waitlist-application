import React, { useEffect, useState } from "react";

const CountDown = ({ resendOTP, setVerifying, verifying }) => {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  // Countdown effect to decrement seconds and minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          clearInterval(interval);
          // Handle timeout if needed
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  return (
    <div className="countdown-text">
      {seconds > 0 || minutes > 0 ? (
        // Display countdown timer
        <p className="font-thin">
          Expires in:{" "}
          <span className="font-bold">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>
      ) : (
        // Display resend OTP link when countdown expires
        <p className="font-thin">
          Didn't receive code?{" "}
          <span
            className="text-yellow-500 underline cursor-pointer"
            onClick={() => {
              resendOTP();
              setMinutes(3); // Reset minutes to 3 when resending OTP
              setSeconds(0); // Reset seconds to 0 when resending OTP
            }}
          >
            Resend OTP
          </span>{" "}
        </p>
      )}
    </div>
  );
};

export default CountDown;
