"use client";

import { useState, useEffect, useCallback } from "react";

export default function Stopwatch() {
  const [status, setStatus] = useState<"stopped" | "running" | "paused">(
    "stopped"
  );
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === "running") {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [status]);

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  }, []);

  const handleStartPauseResume = () => {
    if (status === "stopped" || status === "paused") {
      setStatus("running");
    } else if (status === "running") {
      setStatus("paused");
    }
  };

  const handleReset = () => {
    setStatus("stopped");
    setElapsedTime(0);
  };

  const getButtonText = () => {
    switch (status) {
      case "stopped":
        return "Start";
      case "running":
        return "Pause";
      case "paused":
        return "Resume";
    }
  };

  const getButtonColor = () => {
    switch (status) {
      case "stopped":
        return "bg-white hover:bg-gray-200 text-black";
      case "running":
        return "bg-gray-700 hover:bg-gray-600 text-white";
      case "paused":
        return "bg-gray-600 hover:bg-gray-500 text-white";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-white">
          Stopwatch
        </h1>
        <div className="text-5xl sm:text-6xl font-bold font-mono mb-6 text-center text-white">
          {formatTime(elapsedTime)}
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4">
          <button
            onClick={handleStartPauseResume}
            className={`w-full sm:w-auto px-6 py-2 rounded-md font-semibold ${getButtonColor()} transition-colors duration-200 mb-2 sm:mb-0`}
          >
            {getButtonText()}
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
