'use client'
import { useState } from 'react';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Plot: string;
  Ratings?: { Value: string }[]; 
}

const MovieSearchApp = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovieDetails = async (id:string) => {
    const res = await fetch(`http://www.omdbapi.com/?apikey=2029ecc&i=${id}`);
    const data = await res.json();
    return data;
  };

  const fetchMovies = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetch(`http://www.omdbapi.com/?apikey=2029ecc&s=${query}`);
    const data = await result.json();
    
    if (data.Search) {
      const detailedMovies = await Promise.all(data.Search.map((movie :Movie ) => fetchMovieDetails(movie.imdbID)));
      setMovies(detailedMovies);
    } else {
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={fetchMovies} className="flex flex-col mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button 
          type="submit" 
          className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} 
         
        >
          {loading ? (
            <div className="flex items-center justify-center">
             <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
          ) : (
            'Search'
          )}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="bg-white rounded-lg shadow-lg duration-500 transition transform hover:scale-105">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : '/placeholder.png'}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{movie.Title}</h3>
                <p className="text-sm text-gray-600">Year: {movie.Year}</p>
                <p className="text-sm text-gray-600">Rating: {movie.Ratings && movie.Ratings.length > 0 ? movie.Ratings[0]?.Value : 'N/A'}</p>
                <p className="text-sm text-gray-600">Plot: {movie.Plot ? movie.Plot : 'No details available'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center">No movies found</p>
        )}
      </div>
      
    
    </div>
  );
};

export default MovieSearchApp;