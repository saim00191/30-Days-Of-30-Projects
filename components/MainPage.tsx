"use client";
import "aos/dist/aos.css"; 
import AOS from "aos"; 
import { useEffect } from "react"; 
import Link from "next/link";

export default function MainPage() {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,
    });
  }, []);

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 30 }).map((_, index) => {
          const dayNumber = index + 1;
          const isComingSoon = dayNumber > 25;

          return (
            <Link
              href={
                isComingSoon
                  ? "#"
                  : dayNumber < 10
                  ? `/DAY0${dayNumber}`
                  : `/DAY${dayNumber}`
              }
              key={index}
              className="transform transition-transform hover:scale-105"
            >
              <div
                data-aos="fade-up" // Add the AOS animation effect
                className={`flex flex-col items-center justify-center h-32 rounded-lg shadow-lg p-6 border transition-all duration-300 ${
                  isComingSoon
                    ? "bg-gray-200 border-gray-400 cursor-not-allowed text-gray-600"
                    : "bg-white hover:bg-blue-50 border-blue-500"
                }`}
              >
                {isComingSoon ? (
                  <h1 className="text-xl font-semibold text-red-500">
                    Coming Soon
                  </h1>
                ) : (
                  <h1 className="text-xl font-bold text-blue-700">
                    {dayNumber < 10 ? `DAY0${dayNumber}` : `DAY${dayNumber}`}
                  </h1>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
