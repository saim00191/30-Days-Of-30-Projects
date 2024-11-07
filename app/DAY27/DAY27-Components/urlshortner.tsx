"use client";

import { useState } from "react";
import axios from "axios";

const BITLY_API_URL = "https://api-ssl.bitly.com/v4/shorten";
const BITLY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopySuccess("");

    try {
      const response = await axios.post(
        BITLY_API_URL,
        { long_url: longUrl },
        {
          headers: {
            Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.link);
    } catch {
      setError("Failed to shorten the URL. Please try again.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopySuccess("URL copied to clipboard!");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-md ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-800"
        } hover:bg-opacity-75 transition`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div
        className={`max-w-md w-full p-8 rounded-lg shadow-lg space-y-6 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">URL Shortener</h1>
          <p className="text-lg">
            Paste your long URL and get a short, shareable link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="url"
              placeholder="Paste your long URL here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className={`w-full p-3 pr-20 border rounded-md text-lg transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Shorten
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center font-medium">{error}</div>
          )}

          {shortUrl && (
            <div className="space-y-2 text-center">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className={`w-full p-3 border rounded-md text-lg cursor-text transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100"
                    : "bg-gray-100 border-gray-300 text-gray-900"
                }`}
              />
              <button
                onClick={handleCopy}
                className={`text-lg px-4 py-2 rounded-md transition ${
                  darkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-100"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                Copy URL
              </button>
              {copySuccess && (
                <p className="text-sm text-green-500">{copySuccess}</p>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
