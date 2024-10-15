"use client";
import { useState } from "react";
import { CiDark } from "react-icons/ci";
import { FiSun } from "react-icons/fi";

export default function CalculatorApp() {
  const [input, setInput] = useState<string>(""); // State to hold the current input expression
  const [result, setResult] = useState<string>(""); // State to hold the calculated result
  const [darkMode, setDarkMode] = useState<boolean>(false); // State to hold the current theme (light or dark)

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Function to handle button clicks
  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        // Replace "×" with "*" and "÷" with "/" for evaluation
        const formattedInput = input.replace(/×/g, "*").replace(/÷/g, "/");
        setResult(eval(formattedInput).toString());
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "%") {
      // Handle percentage conversion
      try {
        const lastNumberMatch = input.match(/(\d+(\.\d+)?)$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          const percentageValue = (parseFloat(lastNumber) / 100).toString();
          setInput(input.replace(/(\d+(\.\d+)?)$/, percentageValue));
        }
      } catch {
        setResult("Error");
      }
    } else if (value === "+/-") {
      // Handle toggling the sign of the last number
      try {
        const lastNumberMatch = input.match(/-?\d+(\.\d+)?$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          const toggledNumber = lastNumber.startsWith("-")
            ? lastNumber.substring(1)
            : `-${lastNumber}`;
          setInput(input.replace(/-?\d+(\.\d+)?$/, toggledNumber));
        }
      } catch {
        setResult("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  // Array of calculator buttons
  const buttons = [
    "C", "+/-", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=",
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className={`relative w-full max-w-[400px] p-4 shadow-lg border-[5px] rounded-lg ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-300'}`}>
        {/* Calculator */}
        <div className={`text-right text-2xl md:text-3xl p-4 h-20 flex flex-col justify-end mb-2 ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{input || "0"}</span>
          <span className={`${darkMode ? 'text-white' : 'text-black'} text-3xl md:text-4xl`}>{result || "0"}</span>
        </div>
        {/* Calculator buttons */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`h-16 md:h-20 rounded-full text-xl md:text-2xl font-semibold ${
                btn === "="
                  ? "bg-[#FF9500] text-white"
                  : ["+", "-", "×", "÷"].includes(btn)
                  ? "bg-[#FF9500] text-white"
                  : ["C", "+/-", "%"].includes(btn)
                  ? `${darkMode ? 'bg-[#D4D4D2] text-black' : 'bg-[#E0E0E0] text-gray-800'}`
                  : `bg-gray-800 text-white`
              } hover:opacity-90 active:scale-95 transition`}
              onClick={() => handleButtonClick(btn)}
              style={{ gridColumn: btn === "0" ? "span 2" : undefined }} // Span two columns for "0" button
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Theme Toggle Button */}
        <button
          className={`absolute top-2 left-4 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} transition`}
          onClick={toggleTheme}
        >
          {darkMode ? <CiDark size={24} /> : <FiSun size={24} />}
        </button>
      </div>
    </div>
  );
}