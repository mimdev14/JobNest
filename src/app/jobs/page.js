"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobCard from "@/components/JobCard";
import SkeletonCard from "@/components/SkeletonCard";
import { apiFetch } from "@/lib/api";
import { CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS, REMOTE_OPTIONS } from "@/lib/constants";

export default function BrowseJobsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [experienceLevel, setExperienceLevel] = useState(searchParams.get("experienceLevel") || "");
  const [remote, setRemote] = useState(searchParams.get("remote") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const hasActiveFilters = keyword || category || location || type || experienceLevel || remote;

  const clearFilters = () => {
    setKeyword(""); setCategory(""); setLocation(""); setType("");
    setExperienceLevel(""); setRemote(""); setPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (experienceLevel) params.set("experienceLevel", experienceLevel);
    if (remote) params.set("remote", remote);
    params.set("sort", sort);
    params.set("page", page);
    params.set("limit", 9);

    router.replace(`/jobs?${params}`, { scroll: false });

    setLoading(true);
    apiFetch(`/api/jobs?${params}`)
      .then((data) => { setJobs(data.jobs); setTotalPages(data.totalPages || 1); })
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, [keyword, category, location, type, experienceLevel, remote, sort, page]);

  const inputClass = "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 focus-visible:outline-none";
  const labelClass = "mb-1.5 block text-xs font-medium text-gray-600";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="keyword" className={labelClass}>Keyword</label>
            <input id="keyword" placeholder="Job title, skill or company" value={keyword}
              onChange={(e) => { setPage(1); setKeyword(e.target.value); }} className={inputClass} />
          </div>
          <div>
            <label htmlFor="location" className={labelClass}>Location</label>
            <input id="location" placeholder="City or Remote" value={location}
              onChange={(e) => { setPage(1); setLocation(e.target.value); }} className={inputClass} />
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <select id="category" value={category} onChange={(e) => { setPage(1); setCategory(e.target.value); }} className={inputClass}>
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="type" className={labelClass}>Job Type</label>
            <select id="type" value={type} onChange={(e) => { setPage(1); setType(e.target.value); }} className={inputClass}>
              <option value="">All Types</option>
              {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="experience" className={labelClass}>Experience Level</label>
            <select id="experience" value={experienceLevel} onChange={(e) => { setPage(1); setExperienceLevel(e.target.value); }} className={inputClass}>
              <option value="">All Levels</option>
              {EXPERIENCE_LEVELS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="remote" className={labelClass}>Work Type</label>
            <select id="remote" value={remote} onChange={(e) => { setPage(1); setRemote(e.target.value); }} className={inputClass}>
              <option value="">Any</option>
              {REMOTE_OPTIONS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className={labelClass}>Sort By</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className={inputClass}>
              <option value="newest">Newest</option>
              <option value="salary_high">Salary: High to Low</option>
              <option value="salary_low">Salary: Low to High</option>
            </select>
          </div>
          {hasActiveFilters && (
            <div className="flex items-end">
              <button onClick={clearFilters} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
            <p className="text-gray-500">No jobs found matching your filters.</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">
                Clear filters and try again
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => <JobCard key={j._id} job={j} />)}
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
            Prev
          </button>
          <span className="text-sm font-medium text-gray-700">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
            Next
          </button>
        </div>
      )}
    </div>
  );
}