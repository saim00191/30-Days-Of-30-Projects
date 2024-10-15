"use client";
import { useState, useEffect } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { IoIosPause } from "react-icons/io";
import { MdOutlineRestartAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import Link from "next/link";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && mode === "focus") {
      setMessage("Time For Break");
      setTimeout(() => setMessage(""), 5000);
      setMode("break");
      setTimeLeft(300);
      setIsRunning(false);
    } else if (timeLeft === 0 && mode === "break") {
      setMessage("Focus Time Back On");
      setTimeout(() => setMessage(""), 5000);
      setMode("focus");
      setTimeLeft(1500);
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft , mode]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(1500);
    setMessage("");
  };

  const handleAdd = () => {
    setTimeLeft((prevTime) => prevTime + 60);
  };

  const handleSubtract = () => {
    setTimeLeft((prevTime) => prevTime - 60);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center p-4 sm:p-6">
      <div className="border-[5px] shadow-xl bg-white p-8 md:p-20 rounded-lg max-w-lg w-full">
        <h1 className="text-center text-black font-bold uppercase underline text-2xl sm:text-3xl md:text-4xl">
          Pomodoro Timer App
        </h1>
        <div className="text-center mt-6 text-5xl sm:text-6xl font-bold">
          {formatTime(timeLeft)}
        </div>

        <div className="flex gap-2 sm:gap-4 mt-6 justify-center flex-wrap">
          {!isRunning ? (
            <button
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center text-xl sm:text-2xl bg-gray-300 hover:bg-gray-500"
              onClick={handleStart}
            >
              <VscDebugStart />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center text-xl sm:text-2xl bg-gray-300 hover:bg-gray-500"
            >
              <IoIosPause />
            </button>
          )}

          <button
            onClick={handleAdd}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center text-xl sm:text-2xl bg-gray-300 hover:bg-gray-500"
          >
            <FaPlus />
          </button>

          <button
            onClick={handleSubtract}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center text-xl sm:text-2xl bg-gray-300 hover:bg-gray-500"
          >
            <FaMinus />
          </button>

          <button
            onClick={handleReset}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center text-xl sm:text-2xl bg-gray-300 hover:bg-gray-500"
          >
            <MdOutlineRestartAlt />
          </button>
        </div>
        <div>
          <p className="text-gray-600 text-center text-xl sm:text-2xl font-bold mt-8 sm:mt-12 underline">
            {message}
          </p>
        </div>
        <div className="mt-8 w-full text-center">
          <Link
            href="/"
            className="hover:underline text-lg sm:text-xl text-black"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}