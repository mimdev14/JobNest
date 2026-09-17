"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import JobCard from "@/components/JobCard";

export default function CompanyDetailPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/api/companies/${id}`).then((d) => setCompany(d.company)).catch(() => setCompany(null));
    apiFetch(`/api/jobs?companyId=${id}`).then((d) => setJobs(d.jobs)).catch(() => setJobs([])).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="py-24 text-center text-gray-500">Loading...</p>;
  if (!company) return <p className="py-24 text-center text-gray-500">Company not found.</p>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-50">
          {company.logo ? <img src={company.logo} className="h-full w-full object-cover" /> : <span className="text-3xl font-bold text-blue-600">{company.name[0]}</span>}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
          <p className="mt-1 text-gray-500">{company.industry} · {company.location} · {company.employeeCount}</p>
        </div>
      </div>

      {company.description && <p className="mt-6 leading-7 text-gray-600">{company.description}</p>}
      {company.website && <a href={company.website} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline">{company.website}</a>}

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
        {jobs.length === 0 ? (
          <p className="mt-4 text-gray-500">No open positions right now.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {jobs.map((j) => <JobCard key={j._id} job={j} />)}
          </div>
        )}
      </div>
    </div>
  );
}