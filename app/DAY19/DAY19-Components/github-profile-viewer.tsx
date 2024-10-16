"use client";
import { useState } from "react";
import Link from "next/link";
import { GitHubUser } from "./types";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>("");

  const fetchProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setUser(null);
    }
  };

  return (
    <div className="bg-gray-300 flex min-h-screen items-center justify-center p-4">
      <div className="border-[3px] border-gray-800 p-4 rounded-lg w-full max-w-md">
        <form onSubmit={fetchProfile}>
          <input
            type="text"
            placeholder="Enter GitHub username"
            className="p-4 w-full rounded-md mt-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="p-2 w-full font-medium rounded-md mt-4 bg-blue-500 text-white hover:bg-blue-700"
            type="submit"
          >
            Search
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-xl text-center my-4 underline font-semibold">
            {error}
          </p>
        )}
        {user && (
          <div className="p-4 flex-col justify-center items-center">
            <Image
              src={user.avatar_url}
              alt={user.login}
              className="rounded-full mx-auto"
              width={250}
              height={250}
            />
            <h2 className="font-semibold text-center text-2xl md:text-4xl my-4">
              {user.name || user.login}
            </h2>
            <p className="text-center font-semibold text-lg md:text-xl">
              {user.bio || "No Bio Available"}
            </p>
            <div className="flex space-x-2 md:space-x-4 justify-center my-5">
              <h1 className="text-sm md:text-base">
                Followers:{" "}
                <span className="font-bold text-xl">{user.followers}</span>
              </h1>
              <h1 className="text-sm md:text-base">
                Following:{" "}
                <span className="font-bold text-xl">{user.following}</span>
              </h1>
            </div>
            <div className="mx-auto flex justify-center">
              <Link
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile on GitHub
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
