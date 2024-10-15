"use client"; 

import Link from "next/link";
import { useState } from "react";

export default function ColorPicker() {
  const [color, setColor] = useState("#ffffff");

  const handleChange = (event: {target :{value : string}}) => {
    setColor(event.target.value);
  };

  const getTextColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance < 128 ? "#ffffff" : "#000000";
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-black to-purple-400 flex items-center justify-center`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Color Picker</h1>
        <input
          type="color"
          value={color}
          onChange={handleChange}
          className="w-full h-16 rounded-lg border-none cursor-pointer"
        />
        <div
          className="mt-4 p-4 rounded-lg"
          style={{
            backgroundColor: color,
            color: getTextColor(color),
          }}
        >
          <p className="text-xl font-semibold">{color}</p>
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