"use client";
import Link from "next/link";
import { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState(""); // State for weight input
  const [height, setHeight] = useState(""); // State for height input
  const [bmi, setBmi] = useState<number | null>(null); // State to store the calculated BMI
  const [category, setCategory] = useState(""); // State to store the BMI category

  // Function to calculate BMI
  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100; // Convert height to meters
    const weightInKg = parseFloat(weight); // Convert weight to a number

    // Calculate BMI
    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi); // Update BMI state
    determineBMICategory(calculatedBmi); // Update BMI category
  };

  // Function to determine BMI category based on the calculated BMI
  const determineBMICategory = (bmi: number) => {
    if (bmi < 18.5) setCategory("Underweight");
    else if (bmi >= 18.5 && bmi < 24.9) setCategory("Normal weight");
    else if (bmi >= 25 && bmi < 29.9) setCategory("Overweight");
    else setCategory("Obesity");
  };

  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">BMI Calculator</h1>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Enter your weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-500 outline-none rounded p-2"
          />
          <input
            type="number"
            placeholder="Enter your height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-500 outline-none rounded p-2"
          />
          <button
            onClick={calculateBMI}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-bold"
          >
            Calculate BMI
          </button>
          {bmi && (
            <div className="text-center mt-4">
              <p className="text-xl font-bold">Your BMI: {bmi.toFixed(2)}</p>
              <p className="text-lg">{category}</p>
            </div>
          )}
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