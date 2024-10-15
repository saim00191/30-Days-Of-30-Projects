"use client";
import { useState, useEffect } from "react";
import Link from'next/link'
export default function DigitalClock() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [period, setPeriod] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
      const hrs = currentDate.getHours() % 12 || 12;
      const mins = currentDate.getMinutes();
      const secs = currentDate.getSeconds();
      const period = currentDate.getHours() >= 12 ? "PM" : "AM";

      //"String" convert the 'secs' variable to a string to ensure it can be formatted.

      setHours(String(hrs).padStart(2, "0"));
      setMinutes(String(mins).padStart(2, "0"));
      setSeconds(String(secs).padStart(2, "0"));
      setPeriod(period);

      const date = new Date(Date.now()).toDateString();
      setDate(String(date));
    };

    // Update time every second
    const timer = setInterval(updateTime, 1000);
    updateTime(); // Initial call to set the time immediately

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 p-4 text-white">
      <div className="flex flex-col items-center bg-black p-10 rounded-lg shadow-lg">
        <div className="flex font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl gap-2">
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
          <span className="text-2xl md:text-3xl lg:text-4xl mt-2 text-yellow-300">
            {period}
          </span>
        </div>
        <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold lg:text-4xl text-gray-300">
          {date}
              </div>
              <div className="relative text-lg sm:text-xl text-white mt-8 text-center">
          <Link href="/" className="hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}