"use client";
import Link from "next/link";
import { useState } from "react"; //import State from react
import jokesInUrdu from './jokeInUrdu'

export default function JokeGenerator() {
  const [joke, setJoke] = useState({ setup: "", punchline: "" }); //set the State


  //fetcj Joke Function
  const fetchJoke = async (language : string) => {
    if (language === "urdu") {
      // Display a random Urdu joke
      const randomIndex = Math.floor(Math.random() * jokesInUrdu.length);
      setJoke(jokesInUrdu[randomIndex]);
    } else {
      // Fetch a random English joke
      try {
        const response = await fetch(
          "https://official-joke-api.appspot.com/random_joke"
        );
        const data = await response.json();
        setJoke({ setup: data.setup, punchline: data.punchline });
      } catch (error) {
        setJoke({ setup: "Failed to Fetch Data", punchline: "" });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-3xl font-bold min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-full md:py-24 w-full text-center text-black">
        <h2 className="text-2xl font-semibold mb-4">
          {joke.setup || "Click below to get a joke!"}
        </h2>
        <h3 className="text-xl text-gray-700 mb-4">{joke.punchline}</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={() => fetchJoke("english")}
            className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-all ease-in-out duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            Get English Joke
          </button>
          <button
            onClick={() => fetchJoke("urdu")}
            className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full transition-all ease-in-out duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            Get Urdu Joke
          </button>
        </div>
      <div className="relative text-lg sm:text-xl text-black mt-8 text-center">
        <Link href="/" className="hover:underline">
          Back to Home
        </Link>
      </div>
      </div>
    </div>
  );
}