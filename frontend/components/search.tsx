"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Search = () => {
  const [text, setText] = useState(""); // Stores search query
  const [results, setResults] = useState([]); // Stores search results
  const [loading, setLoading] = useState(false); // Loading state
  const [searched, setSearched] = useState(false); // Track if a search was performed

  // ✅ Function to fetch books from the API
  const fetchBooks = async (query: string) => {
    if (!query.trim()) {
      setSearched(false);
      setResults([]);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/home/Search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results");

      const data = await response.json();
      setResults(data.filteredBooks);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce function (waits before calling API to reduce requests)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBooks(text);
    }, 300); // Waits 300ms after user stops typing

    return () => clearTimeout(delay); // Cleanup previous calls
  }, [text]); // Runs every time `text` changes

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Search Bar */}
      <div className="w-full max-w-lg">
        <div className="relative flex space-x-2">
          <Input
            type="text"
            placeholder="Search Books"
            value={text}
            onChange={(e) => setText(e.target.value)} // ✅ Fetch on every keystroke
            className="pl-10 px-4 py-2 text-lg border border-gray-300 rounded-md w-full"
          />
          <Button disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {/* Display Search Results Only If a Search Was Performed */}
      {searched && results.length > 0 && (
        <div className="absolute mt-40 w-full max-w-lg">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="border rounded-md p-4 bg-white shadow-md">
              {results.map((book: any) => (
                <li key={book._id} className="border-b last:border-b-0 py-2 flex items-center">
                  <img
                    src={book.imageUrl || "atomic.jpg"} // ✅ Display book image
                    alt={book.title}
                    className="w-12 h-16 object-cover mr-3"
                  />
                  <div>
                    <strong>{book.title}</strong> by {book.author}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
