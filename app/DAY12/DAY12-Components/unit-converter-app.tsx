"use client";
import Link from "next/link";
import { useState } from "react";
import { conversion } from "../DAY12-Components/conversionRates";

// The main component for the Unit Converter app
export default function UnitConverter() {
  // State variables to hold the input value, selected units, and conversion result
  const [value, setValue] = useState(""); // Input value for conversion
  const [fromUnit, setFromUnit] = useState(""); // Unit to convert from
  const [toUnit, setToUnit] = useState(""); // Unit to convert to
  const [result, setResult] = useState(""); // Result of the conversion

  // Function to handle the conversion process
  const handleConvert = () => {
    // Check if all inputs are valid
    if (fromUnit === "" || toUnit === "" || isNaN(parseFloat(value))) {
      setResult("Please provide valid input values.");
      return;
    }

    // If the same unit is selected for both from and to, no conversion is needed
    if (fromUnit === toUnit) {
      setResult("Units are the same, no conversion needed.");
      return;
    }

    // Get the conversion function for the selected units
    const conversionFactor = conversion[fromUnit]?.[toUnit];

    // If a conversion function exists, calculate and display the result
    if (conversionFactor) {
      const convertedValue = conversionFactor(parseFloat(value));
      setResult(
        `${value} ${fromUnit} to ${toUnit} is equal to "${convertedValue.toFixed(2)}"`
      );
    } else {
      // If conversion is not available for the selected units, show an error message
      setResult("Conversion not available for selected units.");
    }
  };

  // Function to reset the input fields and result
  const resetHandler = () => {
    setValue("");
    setResult("");
    setFromUnit("");
    setToUnit("");
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Unit Converter</h1>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="">Select unit</option>
              <option value="meters">Meter (m)</option>
              <option value="kilometers">Kilometer (km)</option>
              <option value="centimeters">Centimeter (cm)</option>
              <option value="millimeters">Millimeter (mm)</option>
              <option value="micrometers">Micrometer (µm)</option>
              <option value="nanometers">Nanometer (nm)</option>
              <option value="inches">Inch (in)</option>
              <option value="feet">Foot (ft)</option>
              <option value="yards">Yard (yd)</option>
              <option value="miles">Mile (mi)</option>
              <option value="nauticalMiles">Nautical Mile (nmi)</option>
              <option value="fathoms">Fathom (ftm)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="">Select unit</option>
              <option value="meters">Meter (m)</option>
              <option value="kilometers">Kilometer (km)</option>
              <option value="centimeters">Centimeter (cm)</option>
              <option value="millimeters">Millimeter (mm)</option>
              <option value="micrometers">Micrometer (µm)</option>
              <option value="nanometers">Nanometer (nm)</option>
              <option value="inches">Inch (in)</option>
              <option value="feet">Foot (ft)</option>
              <option value="yards">Yard (yd)</option>
              <option value="miles">Mile (mi)</option>
              <option value="nauticalMiles">Nautical Mile (nmi)</option>
              <option value="fathoms">Fathom (ftm)</option>
            </select>
          </div>
          <button
            onClick={handleConvert}
            className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Convert
          </button>
          <div className="mt-4 text-center text-xl">
            {result ? `${result}` : "Result will be shown here"}
          </div>
          <button
            onClick={resetHandler}
            className="mt-4 bg-gray-600 hover:bg-gray-500 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Reset
          </button>
        </div>
        {/* Back to Home Link */}
        <div className="mt-8 w-full text-center">
          <Link
            href="/"
            className="hover:underline text-lg sm:text-xl text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}