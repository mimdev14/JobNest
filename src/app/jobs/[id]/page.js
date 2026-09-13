"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { useCurrentUser } from "@/lib/useCurrentUser";
import JobCard from "@/components/JobCard";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, hasSession } = useCurrentUser();

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    apiFetch(`/api/jobs/${id}`)
      .then((data) => { setJob(data.job); setSimilarJobs(data.similarJobs); })
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    try {
      await apiFetch("/api/applications", { method: "POST", body: JSON.stringify({ jobId: id, coverLetter }) });
      toast.success("Application submitted!");
      setApplied(true);
      setShowApplyForm(false);
    } catch (err) {
      toast.error(err.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  const handleSave = async () => {
    if (!hasSession) return router.push(`/auth/login?redirect=/jobs/${id}`);
    try {
      const data = await apiFetch(`/api/saved-jobs/${id}/toggle`, { method: "POST" });
      setSaved(data.saved);
      toast.success(data.saved ? "Job saved" : "Removed from saved jobs");
    } catch (err) {
      toast.error(err.message || "Failed to save job");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  if (loading) return <p className="py-24 text-center text-gray-500">Loading...</p>;
  if (!job) return <p className="py-24 text-center text-gray-500">Job not found.</p>;

  const canApply = !hasSession || user?.role === "SEEKER";

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50">
          {job.companyLogo ? <img src={job.companyLogo} className="h-full w-full object-cover" /> : <span className="text-2xl font-bold text-blue-600">{job.companyName?.[0]}</span>}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-1 text-gray-500">{job.companyName} · {job.location}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-600">
        <span className="rounded-full bg-gray-100 px-3 py-1">{job.type}</span>
        <span className="rounded-full bg-gray-100 px-3 py-1 capitalize">{job.remote}</span>
        <span className="rounded-full bg-gray-100 px-3 py-1">{job.experienceLevel}</span>
        {job.salary > 0 && <span className="rounded-full bg-gray-100 px-3 py-1">{job.currency} {job.salary.toLocaleString()}</span>}
        {job.deadline && <span className="rounded-full bg-gray-100 px-3 py-1">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {!hasSession ? (
          <button onClick={() => router.push(`/auth/login?redirect=/jobs/${id}`)} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">Login to Apply</button>
        ) : applied ? (
          <span className="rounded-lg bg-green-100 px-6 py-3 text-sm font-semibold text-green-700">✓ Applied</span>
        ) : canApply ? (
          <button onClick={() => setShowApplyForm(true)} disabled={applying} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">Apply Now</button>
        ) : null}

        {hasSession && user?.role === "SEEKER" && (
          <button onClick={handleSave} className={`rounded-lg border px-6 py-3 text-sm font-semibold ${saved ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
            {saved ? "★ Saved" : "☆ Save Job"}
          </button>
        )}

        <button onClick={handleShare} className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">Share</button>
      </div>

      {showApplyForm && (
        <div className="mt-6 rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900">Submit your application</h3>
          <textarea rows={5} placeholder="Cover letter (optional)" value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
          <div className="mt-4 flex gap-3">
            <button onClick={() => setShowApplyForm(false)} className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50">Cancel</button>
            <button onClick={handleApply} disabled={applying} className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
              {applying ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div><h2 className="font-semibold text-gray-900">Description</h2><p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-600">{job.description}</p></div>
        <div><h2 className="font-semibold text-gray-900">Responsibilities</h2><p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-600">{job.responsibilities}</p></div>
        <div><h2 className="font-semibold text-gray-900">Requirements</h2><p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-600">{job.requirements}</p></div>
        <div><h2 className="font-semibold text-gray-900">Benefits</h2><p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-600">{job.benefits}</p></div>
      </div>

      {similarJobs.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-gray-900">Similar Jobs</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {similarJobs.map((j) => <JobCard key={j._id} job={j} />)}
          </div>
        </div>
      )}
    </div>
  );
}