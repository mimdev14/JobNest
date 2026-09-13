"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobCard from "@/components/JobCard";
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
    params.set("limit", 12);

    router.replace(`/jobs?${params}`, { scroll: false });

    setLoading(true);
    apiFetch(`/api/jobs?${params}`)
      .then((data) => { setJobs(data.jobs); setTotalPages(data.totalPages || 1); })
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, [keyword, category, location, type, experienceLevel, remote, sort, page]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input placeholder="Keyword" value={keyword} onChange={(e) => { setPage(1); setKeyword(e.target.value); }}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <input placeholder="Location" value={location} onChange={(e) => { setPage(1); setLocation(e.target.value); }}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <select value={category} onChange={(e) => { setPage(1); setCategory(e.target.value); }}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={type} onChange={(e) => { setPage(1); setType(e.target.value); }}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
          <option value="">All Types</option>
          {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={experienceLevel} onChange={(e) => { setPage(1); setExperienceLevel(e.target.value); }}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
          <option value="">All Levels</option>
          {EXPERIENCE_LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select value={remote} onChange={(e) => { setPage(1); setRemote(e.target.value); }}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
          <option value="">Any Location Type</option>
          {REMOTE_OPTIONS.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
          <option value="newest">Newest</option>
          <option value="salary_high">Salary: High to Low</option>
          <option value="salary_low">Salary: Low to High</option>
        </select>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => <JobCard key={j._id} job={j} />)}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-40">Prev</button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}