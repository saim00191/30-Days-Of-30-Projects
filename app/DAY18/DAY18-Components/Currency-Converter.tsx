"use client";
import React, { useState, useEffect } from "react";
import currencies from "./currencies";

interface ExchangeRates {
  [key: string]: number;
}

const CurrencyConverter = () => {
 
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("PKR");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
        setError("");
      } catch (err) {
        setError("Error fetching exchange rates:");
        setConvertedAmount(null);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleConvert = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      setConvertedAmount(null);
      return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    if (fromRate && toRate) {
      const conversionRate = toRate / fromRate;
      const result = numericAmount * conversionRate;
      setConvertedAmount(parseFloat(result.toFixed(2)));
      setError("");
    } else {
      setError("Please select valid currencies.");
      setConvertedAmount(null);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="border-[5px] border-white shadow-lg p-8 md:p-12 flex flex-col w-full max-w-md">
        <h1 className="font-bold text-2xl my-5 text-center underline">
          Currency Converter
        </h1>
        <div className="flex-col flex">
          <div className="my-3">
            <select
              className="p-2 w-full rounded-md mt-4"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <select
              className="p-2 w-full rounded-md mt-4"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 w-full rounded-md mt-4"
            />
          </div>
          <div className="flex justify-end items-end">
            <button
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium p-2 rounded-md"
              onClick={handleConvert}
            >
              Convert
            </button>
          </div>
        </div>
        {convertedAmount !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">
              Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
            </h2>
          </div>
        )}
        {error && (
          <p className="text-red-500 font-semibold text-center mt-3">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;