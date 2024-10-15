"use client";
import { useState } from "react";
import Link from "next/link";

export default function NumberGuessingGame() {
  // State variables to manage the game state
  const [targetNumber, setTargetNumber] = useState(
    // Randomly generates a target number between 1 and 50
    () => Math.floor(Math.random() * 50) + 1
  );
  const [guess, setGuess] = useState("0"); // Holds the user's current guess
  const [attempts, setAttempts] = useState(0); // Counts the number of attempts
  const [message, setMessage] = useState(""); // Displays messages to the user
  const [isGameOver, setIsGameOver] = useState(false); // Tracks if the game is over

  // Function to handle when the user clicks the "Guess" button
  const handleGuess = () => {
    // Check if the guess is valid (not empty and a number)
    if (!guess || isNaN(Number(guess))) {
      setMessage("Please enter a valid number");
      return;
    }

    // Increment the number of attempts
    setAttempts(attempts + 1);

    // Check if the user has reached the maximum number of attempts
    if (attempts === 7) {
      setMessage(
        "You have reached the maximum number of attempts. Please start a new game."
      );
      // Reset the game state after reaching the maximum attempts
      setTargetNumber(Math.floor(Math.random() * 50) + 1);
      setGuess("0");
      setAttempts(0);
      setIsGameOver(true); // Set the game as over
      return;
    }

    // Check if the guess is correct
    if (Number(guess) === targetNumber) {
      setMessage(
        `Congratulations! You guessed the number in ${attempts + 1} attempts.`
      );
      setIsGameOver(true); // Disable the Guess button since the game is over
    }
    // Check if the guess is too low
    else if (targetNumber > Number(guess)) {
      setMessage("Too low! Try higher.");
    }
    // Check if the guess is too high
    else {
      setMessage("Too high! Try lower.");
    }
  };

  // Function to reset the game when the user clicks the "Reset" button
  const resetGame = () => {
    // Reset the game state
    setTargetNumber(Math.floor(Math.random() * 50) + 1);
    setGuess("0");
    setAttempts(0);
    setMessage("");
    setIsGameOver(false); // Re-enable the Guess button for a new game
  };

  return (
    // Fragment
    <>
      <div
        // Container for the entire game, styled with a gradient
        className="bg-gradient-to-br from-green-100 via-purple-900 to-blue-100 min-h-screen flex items-center justify-center p-4"
      >
        <div className="bg-white border-blue-800 border-4 rounded-xl shadow-lg px-8 py-6 md:px-16 md:py-12 text-center w-full max-w-md">
          {/* Game title */}
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-blue-800 mb-6">
            Number Guessing Game
          </h1>
          <p className="mb-4">
            Guess the Number between{" "}
            <span className="text-yellow-700 font-bold">1</span> to{" "}
            <span className="text-yellow-700 font-bold">50</span>.<br />
            You have Only <span className="text-yellow-700 font-bold">
              8
            </span>{" "}
            Chances
          </p>
          {/* Input field for the user to enter their guess */}
          <div className="flex gap-4 items-center justify-center mb-4 flex-col md:flex-row">
            <input
              type="number"
              placeholder="Enter Your Guess"
              value={guess}
              className="w-full md:w-68 p-2 border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setGuess(e.target.value)} // Updates the guess state when the user types
              disabled={isGameOver} // Disable input if the game is over
            />
          </div>
          {/* Buttons for making a guess and resetting the game */}
          <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700 md:mb-0"
              onClick={handleGuess} // Calls handleGuess when clicked
              disabled={isGameOver} // Disable the button if the game is over
            >
              Guess
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-500"
              onClick={resetGame} // Calls resetGame when clicked
            >
              {attempts === 8 ? "Start New Game" : "Reset"}
            </button>
          </div>
          {/* Displays the number of attempts */}
          <div className="text-lg font-semibold text-blue-900 mt-4">
            Attempts: {attempts}
          </div>
          {/* Displays the message to the user */}
          <p className="text-gray-700 uppercase text-xl mt-2">{message}</p>
          <div className="flex justify-center text-lg sm:text-2xl text-black text-center mt-6 hover:underline">
            <Link href="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
