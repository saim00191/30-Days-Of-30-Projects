"use client";
import Link from "next/link";
import { useState } from "react";

export default function TipCalculator() {
  // State management for bill, tip percentage, total tip, and total amount
  const [bill, setBill] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [totalTip, setTotalTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Handle input change for tip percentage
  const handleTipPercentage = (e: { target: { value: string } }) => {
    setTipPercentage(parseFloat(e.target.value));
  };

  // Reset all fields to initial state
  const resetHandler = () => {
    setBill(0);
    setTipPercentage(0);
    setTotalTip(0);
    setTotalAmount(0);
  };

  // Handle input change for bill amount
  const handleBillAmount = (e: { target: { value: string } }) => {
    setBill(parseFloat(e.target.value));
  };

  // Calculate the tip and total amount
  const calculateTip = () => {
    const calculatedTip = (bill * tipPercentage) / 100;
    setTotalTip(calculatedTip);
    setTotalAmount(bill + calculatedTip);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-blue-200">
      <div className="border-[5px] max-w-lg w-full border-white p-6 md:p-8 bg-white rounded-md shadow-md">
        {/* App Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-5 underline text-center">
          Tip Calculator App
        </h1>

        {/* Bill Amount Input */}
        <div className="flex flex-col gap-3 mb-4">
          <input
            onChange={handleBillAmount}
            value={bill}
            type="number"
            placeholder="Enter bill amount"
            className="border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tip Percentage Input */}
        <div className="flex flex-col gap-3 mb-4">
          <input
            type="number"
            placeholder="Enter tip percentage"
            onChange={handleTipPercentage}
            value={tipPercentage}
            className="border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons for Calculate and Reset */}
        <div className="flex flex-col md:flex-row gap-3">
          <button
            className="bg-blue-800 text-white p-2 rounded-md w-full md:w-[48%] hover:bg-blue-700 transition"
            onClick={calculateTip}
          >
            Calculate Tip
          </button>
          <button
            className="bg-red-700 text-white p-2 rounded-md w-full md:w-[48%] hover:bg-red-600 transition"
            onClick={resetHandler}
          >
            Reset
          </button>
        </div>

        {/* Displaying Results */}
        <div className="flex flex-col items-end mt-4 text-right">
          <p className="text-lg md:text-xl font-bold">
            Bill Amount: {bill.toFixed(2)}
          </p>
          <p className="text-lg md:text-xl font-bold">
            Tip Amount: {totalTip.toFixed(2)}
          </p>
        </div>

        {/* Total Amount */}
        <hr className="mt-2 border-gray-300" />
        <div className="flex justify-end mt-2">
          <h1 className="font-bold text-lg md:text-xl">
            Total Amount: {totalAmount.toFixed(2)}
          </h1>
        </div>
        {/*Back To Home Link*/}
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