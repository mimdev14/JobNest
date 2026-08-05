"use client";

import { Search, MapPin } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mx-auto mt-10 w-full max-w-5xl rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur">
      <form className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Job Search */}
        <div className="flex flex-1 items-center rounded-xl border border-gray-200 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <Search className="mr-3 h-5 w-5 text-black" />

          <input
            type="text"
            placeholder="Job title, skill or company"
            className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {/* Divider */}
        <div className="hidden h-10 w-px bg-gray-200 lg:block" />

        {/* Location */}
        <div className="flex flex-1 items-center rounded-xl border border-gray-200 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
          <MapPin className="mr-3 h-5 w-5 text-black" />

          <input
            type="text"
            placeholder="Location or Remote"
            className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          Search Jobs
        </button>
      </form>
    </div>
  );
}