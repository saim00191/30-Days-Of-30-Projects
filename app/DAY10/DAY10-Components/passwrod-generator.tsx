"use client";
import Link from "next/link";
import { useState } from "react"; // Importing state from React
import { FaRegCopy } from "react-icons/fa6"; // Importing copy Icon from React-Icons

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>(""); // Using state for password generation
  const [length, setLength] = useState<number>(12); // Using state for password length
  const [uppercase, setUppercase] = useState<boolean>(true); // Tracks if uppercase letters should be included
  const [numbers, setNumbers] = useState<boolean>(true); // Tracks if numbers should be included
  const [specialCharacters, setSpecialCharacters] = useState<boolean>(true); // Tracks if special characters should be included
  const [message, setMessage] = useState<string>(""); // State for displaying messages

  // Function To Generate Password
  const generatePassword = () => {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz"; // String of lowercase letters
    const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // String of uppercase letters
    const numbersCharacters = "0123456789"; // String of numeric characters
    const symbolsCharacters = "!@#$%^&*()_+"; // String of special characters

    let generatedPassword = ""; // Initialize an empty string to store the generated password
    let characters = lowerCase; // Start with lowercase letters as the default character set

    if (uppercase) characters += upperCaseCharacters; // Add uppercase characters if the option is enabled
    if (numbers) characters += numbersCharacters; // Add numeric characters if the option is enabled
    if (specialCharacters) characters += symbolsCharacters; // Add special characters if the option is enabled

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length); // Generate a random index
      generatedPassword += characters[randomIndex]; // Add the randomly selected character to the generated password
    }

    setPassword(generatedPassword); // Update the state with the newly generated password
  };

  // Function to copy the generated password to the clipboard
  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(
        () => {
          setMessage("Password copied to clipboard!"); // Show success message
          setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
        },
        () => {
          setMessage("Failed to copy password."); // Show error message
          setTimeout(() => setMessage(""), 2000); // Clear message after 2 seconds
        }
      );
    }
  };

  return (
    <div className="bg-green-400 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white border-[5px] border-black text-center p-8 md:p-16 rounded-lg w-full max-w-lg">
        <h1 className="font-bold text-2xl md:text-3xl mb-6 underline">PASSWORD GENERATOR</h1>
        <div className="flex flex-col gap-4">
          <div className="relative flex items-center">
            <input
              type="text"
              value={password}
              placeholder="Password Shows here"
              readOnly
              className="p-4 pr-12 outline-blue-500 border-gray-500 border-[4px] rounded text-center text-lg md:text-2xl w-full"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-3 text-gray-900 text-xl bg-gray-300 rounded-full p-1.5 hover:text-black"
            >
              <FaRegCopy />
            </button>
          </div>
          {message && <p className="text-green-600 font-semibold mt-2">{message}</p>}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl md:text-2xl">Length: {length}</h1>
            <input
              id="length"
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full mb-4 cursor-pointer"
            />
          </div>
          <div className="space-y-2 mb-4 text-center mx-4 md:mx-8 text-lg md:text-2xl">
            <div className="flex items-center space-x-2 ">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              <span>Include Uppercase Letters</span>
            </div>
            <div className="flex items-center space-x-2 ">
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
              <span>Include Numbers</span>
            </div>
            <div className="flex items-center space-x-2 ">
              <input
                type="checkbox"
                checked={specialCharacters}
                onChange={(e) => setSpecialCharacters(e.target.checked)}
              />
              <span>Include Symbols</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={generatePassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Password
          </button>
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