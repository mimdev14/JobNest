"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS, REMOTE_OPTIONS } from "@/lib/constants";

export default function PostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", category: CATEGORIES[0], type: JOB_TYPES[0], experienceLevel: EXPERIENCE_LEVELS[0],
    salary: "", currency: "USD", location: "", remote: "on-site", deadline: "",
    description: "", responsibilities: "", requirements: "", benefits: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (publish) => {
    setSubmitting(true);
    try {
      await apiFetch("/api/jobs", { method: "POST", body: JSON.stringify({ ...form, publish }) });
      toast.success(publish ? "Job published successfully" : "Job saved as draft");
      router.push("/dashboard/recruiter/jobs");
    } catch (err) {
      toast.error(err.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>

      <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col gap-4">
        <input required placeholder="Job title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />

        <div className="grid grid-cols-3 gap-4">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
            {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <select value={form.experienceLevel} onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
            {EXPERIENCE_LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input required placeholder="Location" value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
          <select value={form.remote} onChange={(e) => setForm({ ...form, remote: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none">
            {REMOTE_OPTIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <input type="number" placeholder="Salary" value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        </div>

        <input type="date" placeholder="Application deadline" value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />

        <textarea rows={4} placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <textarea rows={4} placeholder="Responsibilities" value={form.responsibilities}
          onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <textarea rows={4} placeholder="Requirements" value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <textarea rows={3} placeholder="Benefits" value={form.benefits}
          onChange={(e) => setForm({ ...form, benefits: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />

        <div className="mt-2 flex gap-3">
          <button type="button" onClick={() => handleSubmit(false)} disabled={submitting}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50">
            Save as Draft
          </button>
          <button type="button" onClick={() => handleSubmit(true)} disabled={submitting}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}