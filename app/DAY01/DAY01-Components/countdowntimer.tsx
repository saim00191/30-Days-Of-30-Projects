"use client";
import { useState, useEffect, useRef } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { GrResume } from "react-icons/gr";
import { BiReset } from "react-icons/bi";
import bgImage from '../DAY01-Components/BgImage/bgImage.jpg';
import Link from 'next/link';

export default function CountDownTimer() {
  const [targetDate, setTargetDate] = useState<number | string>("");
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const intervalRef = useRef<ReturnType<typeof setInterval> | number | null>(
    null
  );

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as number);
            setTargetDate("");
            setMessage("Times Up!");
            setTimeout(() => setMessage(""), 2000);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current as number);
    }
    return () => clearInterval(intervalRef.current as number);
  }, [isActive, isPaused]);

  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const diff = Math.floor((targetTime - currentTime) / 1000);
    setRemainingTime(diff > 0 ? diff : 0);
  };

  const handleStart = () => {
    if (targetDate) {
      calculateRemainingTime();
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (isActive) {
      setIsPaused(!isPaused);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current as number);
    intervalRef.current = null;
    setIsActive(false);
    setIsPaused(false);
    setRemainingTime(0);
    setTargetDate("");
    setMessage("");
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 bg-white"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white text-center mb-2 uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
          Count Down <span className="text-yellow-600">Timer</span>
        </h1>

        <div className="border-[7px] border-white rounded-2xl shadow-xl px-4 py-8 sm:py-12 md:px-8 lg:py-16 lg:px-12 w-full max-w-[400px] sm:max-w-[500px]">
          <div className="border-[3px] rounded mb-4 w-full">
            <input
              type="datetime-local"
              onChange={(e) => setTargetDate(e.target.value)}
              value={targetDate}
              disabled={isActive && isPaused}
              className="text-gray-800 uppercase text-center font-bold w-full outline-none p-2  bg-white"
            />
          </div>
          <div className="text-white font-mono mb-6 mt-4">
            <h1 className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] font-bold text-center">
              {formatTime(remainingTime)}
            </h1>
          </div>
          {message && (
            <p className="text-red-600 font-semibold text-center mx-auto mb-8 text-lg">
              {message}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn btn-primary font-bold bg-green-700 hover:bg-green-900 text-white py-2 px-6 text-base sm:text-lg"
              onClick={handleStart}
            >
              Start
              <span className="ml-2">
                <FaArrowAltCircleUp />
              </span>
            </button>
            <button
              className="btn btn-primary font-bold bg-blue-700 hover:bg-blue-900 text-white py-2 px-6 text-base sm:text-lg"
              onClick={handlePause}
            >
              {isPaused ? (
                <div className="flex items-center">
                  Resume
                  <GrResume className="ml-2" />
                </div>
              ) : (
                <div className="flex items-center">
                  Pause
                  <FaCirclePause className="ml-2" />
                </div>
              )}
            </button>
            <button
              className="btn btn-primary font-bold bg-red-700 hover:bg-red-900 text-white py-2 px-6 text-base sm:text-lg"
              onClick={handleReset}
            >
              Reset
              <BiReset className="ml-2" />
            </button>
          </div>
        </div>
        <div className="flex justify-center text-lg sm:text-2xl text-white text-center mt-6 hover:underline">
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </>
  );
}
