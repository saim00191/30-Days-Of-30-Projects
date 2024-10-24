"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  sourceUrl: string;
}

export default function RecipeSearchApp() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRecipes = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    setRecipes([]); 

    const apiKey = process.env.NEXT_PUBLIC_API_KEY; 

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      if (data.results.length === 0) {
        setError("No recipes found.");
      } else {
        setRecipes(data.results);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recipe Search App</h1>

      <form onSubmit={searchRecipes} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a recipe or ingredient"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48"
              width={500}
              height={300}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              {recipe.sourceUrl ? (
                <Link
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Recipe
                </Link>
              ) : (
                <p className="text-gray-500">No recipe link available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
