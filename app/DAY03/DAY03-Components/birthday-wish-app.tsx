"use client";

import { useState, useEffect, useRef } from "react";
import { Archivo_Black, Protest_Guerrilla } from "next/font/google";
import { Fireworks } from "fireworks-js"; // Import the Fireworks class from the library
import BgImage from './BgImage/bgImage.png'

// Define the font loader at the module scope
const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mate = Protest_Guerrilla({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function BirthdayWishApp() {
  // State variables for name, birthday, message, and fireworks visibility
  const [name, setName] = useState(""); // Stores the user's name
  const [birthday, setBirthday] = useState(""); // Stores the user's birthday
  const [message, setMessage] = useState(""); // Stores the message displayed to the user
  const [showFireworks, setShowFireworks] = useState(false); // Toggles fireworks display
  const fireworksRef = useRef(null); // Reference to the fireworks container element

  // Initialize fireworks effect when showFireworks is set to true
  useEffect(() => {
    if (showFireworks && fireworksRef.current) {
      // Create a new instance of Fireworks in the referenced container
      const fireworks = new Fireworks(fireworksRef.current, {
        rocketsPoint: { min: 50, max: 50 }, // Fireworks launch from the center
        hue: { min: 0, max: 360 }, // Random hue colors for fireworks
        delay: { min: 30, max: 60 },
        acceleration: 1.05, // Acceleration of fireworks particles
        friction: 0.98, // Friction to reduce speed
        gravity: 1, // Gravity effect on particles
        particles: 100, // Number of particles per explosion
        explosion: 5, // Explosion strength
      });

      fireworks.start(); // Start the fireworks animation

      setTimeout(() => {
        setShowFireworks(false); // Hide fireworks when the timer expires
      }, 15000);

      // Cleanup function to stop fireworks when the component is unmounted or showFireworks is false
      return () => fireworks.stop();
    }
  }, [showFireworks]);

  // Function to clear the name input field
  const clearInputs = () => {
    setName("");
  };

  // Function to handle the form submission and determine the birthday message
  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get today's date and format it to MM-DD
    const today = new Date();
    const todayMonthDay = today.toISOString().slice(5, 10);

    // Format the input birthday to MM-DD
    const inputDate = new Date(birthday);
    const inputMonthDay = inputDate.toISOString().slice(5, 10);
    const inputYear = today.getFullYear(); // Get the current year

    // Set the next birthday date based on the input year and month-day
    let nextBirthday = new Date(`${inputYear}-${inputMonthDay}`);
    if (nextBirthday < today) {
      // If the next birthday date has already passed this year, use the next year
      nextBirthday = new Date(`${inputYear + 1}-${inputMonthDay}`);
    }

    // Calculate the number of days until the next birthday
    const daysUntilBirthday = Math.ceil( //Math.ceil is a JavaScript function that rounds a number up to the nearest integer, regardless of the decimal value.
      (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Conditional logic to display appropriate messages
    if (name === "") {
      // Check if the name is empty
      setMessage("Please enter your name.");
      clearInputs();
    } else if (!isNaN(Number(name))) {
      // Check if the name is a number
      setMessage("Please enter a valid name that isn't a number.");
      clearInputs();
    } else if (todayMonthDay === inputMonthDay) {
      // Check if today is the user's birthday
      setMessage(
        `Happy birthday, '${name}!'\n 🎉\nWishing you a day filled with joy, laughter, and all your favorite things. Enjoy every moment of your special day!`
      );
      setShowFireworks(true); // Show fireworks if today is the birthday
    } else if (daysUntilBirthday > 300) {
      // Check if the birthday is over 300 days away
      setMessage(
        `Hey ${name}, your birthday is ${daysUntilBirthday} days away! 🎉\n\nIt’s over 300 days until your special day, but it’s never too early to start planning a fantastic celebration!`
      );
      clearInputs();
    } else if (daysUntilBirthday > 200) {
      // Check if the birthday is over 200 days away
      setMessage(
        `Hey ${name}, your birthday is ${daysUntilBirthday} days away! 🎈\n\nIt's over 200 days away, but time flies, so start thinking about how you want to celebrate!`
      );
      clearInputs();
    } else if (daysUntilBirthday > 100) {
      // Check if the birthday is over 100 days away
      setMessage(
        `Hey ${name}, your birthday is ${daysUntilBirthday} days away! 🥳\n\nIt’s over 100 days away—slowly approaching, so get excited and start the countdown!`
      );
      clearInputs();
    } else if (daysUntilBirthday > 50) {
      // Check if the birthday is over 50 days away
      setMessage(
        `Hey ${name}, your birthday is ${daysUntilBirthday} days away! 🎊\n\nWith just over 50 days left, it’s time to start planning something special!`
      );
      clearInputs();
    } else if (daysUntilBirthday <= 50) {
      // Check if the birthday is within 50 days
      setMessage(
        `Hey ${name}, your birthday is just ${daysUntilBirthday} days away! 🎁\n\nThe countdown is on! Make sure you’re ready for your big day!`
      );
      clearInputs();
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${BgImage.src})` }} // Background image for the app
    >
      {/* Display fireworks when the showFireworks state is true */}
      {showFireworks && (
        <div
          ref={fireworksRef}
          className="absolute inset-0 flex items-center justify-center z-50"
        ></div>
      )}

      <div className="bg-white border-[7px] rounded-lg shadow-lg p-8 w-full max-w-md mx-4 sm:mx-6 md:mx-8 lg:mx-12 z-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🎂{" "}
          <span className={`${mate.className} text-4xl text-yellow-700`}>
            BIRTHDAY
          </span>
          <span className={`${archivo.className} text-slate-800`}> WISH</span>🎉
          <span className="font-mono"> APP</span>🎉
        </h1>
        {/* Form to collect user's name and birthday */}
        <form className="flex flex-col items-center">
          <input
            onChange={(e) => setName(e.target.value)} // Update name state on change
            type="text"
            value={name}
            placeholder="Enter your name"
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            onChange={(e) => setBirthday(e.target.value)} // Update birthday state on change
            type="date"
            className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSubmit} // Handle form submission
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all duration-300"
          >
            Submit
          </button>
        </form>
        {/* Display the generated message */}
        <p className="text-center text-xl text-gray-600 mb-4 mt-4 font-semibold">
          {message}
        </p>
      </div>
    </div>
  );
}