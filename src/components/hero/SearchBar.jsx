"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (location) params.set("location", location);
    router.push(`/jobs?${params}`);
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center rounded-xl border border-gray-200 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <Search className="mr-3 h-5 w-5 text-black" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skill or company"
            className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div className="hidden h-10 w-px bg-gray-200 lg:block" />

        <div className="flex flex-1 items-center rounded-xl border border-gray-200 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <MapPin className="mr-3 h-5 w-5 text-black" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location or Remote"
            className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <button type="submit" className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:shadow-lg">
          Search Jobs
        </button>
      </form>
    </div>
  );
}