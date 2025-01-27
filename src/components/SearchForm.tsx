"use client";

import { useState, useRef } from "react";

export default function SearchForm({ searchTerm }: { searchTerm: string }) {
  const [search, setSearch] = useState(searchTerm);
  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearch("");
    window.location.href = "/";
  };

  return (
    <form ref={formRef} action="/">
      <label htmlFor="search" className="text-lg font-bold mb-2 block">
        Search
      </label>
      <p className="mb-2">Searching for: {searchTerm}</p>
      <div className="flex gap-4 mb-4">
        <input
          id="search"
          name="search"
          className="border border-gray-300 rounded-md p-2 mr-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Search
        </button>
        {searchTerm && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={resetForm}
            type="button"
          >
            Reset Search
          </button>
        )}
      </div>
    </form>
  );
}
