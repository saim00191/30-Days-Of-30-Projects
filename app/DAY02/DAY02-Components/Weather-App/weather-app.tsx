"use client";
import { FaSearch } from "react-icons/fa"; //import Search Icon
import { WiHumidity } from "react-icons/wi"; //import Humidity Icon
import { FaWind, FaCalendar } from "react-icons/fa"; //import Wind and Calender Icon
import { useState } from "react"; // import use-state from react
import axios from "axios"; //Axios is a promise-based HTTP client for the browser and Node.js that allows you to make HTTP requests to retrieve or send data.
import { WeatherDataTypes, EventTypes } from "./types"; // import Types
import BgImage from "../BgImage/bgImage.png";
import Link from "next/link";
import Image from "next/image";

export default function Weather() {
  //Use States
  const [location, setLocation] = useState<string>(""); // Type for location input
  const [weather, setWeather] = useState<WeatherDataTypes | null>(null); // Set the state type to the WeatherData type or null
  const [error, setError] = useState<string>(""); // State to handle error messages

  //input field handler
  const inputHandler = (e: EventTypes) => {
    setLocation(e.target.value);
  };

  // Handles keyboard events for the input field. If the Enter key is pressed, it triggers the `getWeather` function.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  //get weather Function
  const getWeather = async () => {
    const api_key = "e5061ca4fb524bcc8c654443240309";
    const api_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`;

    if (location) {
      try {
        const response = await axios.get(api_url);
        if (response.data) {
          // Destructuring the weather data
          const {
            location: { name, country },
            current: { temp_c, condition, humidity, wind_kph },
          } = response.data;

          // Set up the fetched weather data
          setWeather({
            name,
            country,
            temperature: temp_c,
            conditionText: condition.text,
            conditionIcon: `https:${condition.icon}`,
            humidity,
            windSpeed: wind_kph,
          });
          setError(""); // Clear previous errors if the call was successful
          setLocation(""); // Clear the location input if the call was successful
        }
      } catch (error) {
        setError("Failed to Fetch Weather Data. Please try again.");
        setWeather(null); // Clear the weather data if an error occurred
        setLocation(""); // Clear the location input if an error occurred
      }
    }
  };

  return (
    <>
      {/* Main container */}
      <div className="flex text-center items-center justify-center min-h-screen bg-slate-900 p-4">
        {/* Weather app content */}
        <div
          className="border border-blue-900 rounded-xl bg-opacity-75 p-4 sm:p-6 md:p-10 lg:p-16 bg-cover bg-center bg-no-repeat shadow-lg max-w-lg md:max-w-xl lg:max-w-2xl w-full"
          style={{
            backgroundImage: `url(${BgImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1
            className={`text-white text-3xl font-bold sm:text-4xl lg:text-5xl uppercase mb-4 sm:mb-6 text-center`}
          >
            <span className="text-slate-600 text-[35px] sm:text-[45px] font-extrabold">
              Weather
            </span>{" "}
            App
          </h1>

          {/* Input field and search button */}
          <div className="py-4 sm:py-5 flex">
            <input
              onChange={inputHandler}
              onKeyDown={handleKeyDown}
              value={location}
              type="text"
              placeholder="Search Weather..."
              className="px-3 sm:px-4 py-2 sm:py-3 w-full outline-none border-2 border-green-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-green-400 transition duration-200"
            />
            <button
              className="text-white rounded-full w-10 sm:w-12 ml-2 sm:ml-4 p-2 sm:p-3 shadow-lg transition duration-300 transform hover:scale-105"
              onClick={getWeather}
            >
              <FaSearch size={24} />
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-xl sm:text-2xl mt-4">{error}</p>
          )}

          {/* Weather display */}
          {weather && (
            <div className="text-white flex flex-col items-center mt-4 sm:mt-6">
              <Image
                src={weather.conditionIcon}
                alt="Weather Icon"
                className="sm:w-24 sm:h-24 mb-3 sm:mb-4"
                width={200}
                height={200}
              />
              <div className="flex flex-col items-center mb-4 sm:mb-6">
                <h1 className={`text-[35px] sm:text-[50px] font-semibold`}>
                  {weather.temperature}°C
                </h1>
                <h2 className="text-xl sm:text-2xl mt-2">
                  {weather.name}, {weather.country}
                </h2>
              </div>
              <h3 className="text-lg sm:text-xl italic mb-3 sm:mb-4">
                {weather.conditionText}
              </h3>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 p-2 sm:p-3 rounded-lg">
                  <WiHumidity size={30} />
                  <span className="text-md sm:text-lg">
                    {weather.humidity}%
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-10 p-2 sm:p-3 rounded-lg">
                  <FaWind size={30} />
                  <span className="text-md sm:text-lg">
                    {weather.windSpeed} km/h
                  </span>
                </div>
              </div>

              {/* Date display */}
              <div className="flex items-center space-x-2 mt-2 bg-white bg-opacity-10 p-2 sm:p-3 rounded-lg">
                <FaCalendar size={24} />
                <span className="text-md sm:text-lg">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          {/* "Back to Home" link */}
          <div className="flex justify-center text-lg sm:text-xl text-white mt-6">
            <Link href="/" className="hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
