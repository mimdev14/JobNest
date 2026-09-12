"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const chooseRole = async (role) => {
    setSaving(true);
    try {
      await apiFetch("/api/auth/role", { method: "PATCH", body: JSON.stringify({ role }) });
      router.push(role === "RECRUITER" ? "/dashboard/recruiter" : "/dashboard/seeker");
    } catch (err) {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-gray-900">How will you use JobNest?</h1>
      <p className="mt-3 text-gray-600">You can't change this later without contacting support.</p>

      <div className="mt-10 grid w-full gap-4 sm:grid-cols-2">
        <button onClick={() => chooseRole("SEEKER")} disabled={saving}
          className="rounded-2xl border border-gray-200 p-8 text-left transition-all hover:-translate-y-1 hover:border-black hover:shadow-lg disabled:opacity-50">
          <p className="text-xl font-bold text-gray-900">I'm looking for a job</p>
          <p className="mt-2 text-sm text-gray-600">Search jobs, apply, and track your applications.</p>
        </button>
        <button onClick={() => chooseRole("RECRUITER")} disabled={saving}
          className="rounded-2xl border border-gray-200 p-8 text-left transition-all hover:-translate-y-1 hover:border-black hover:shadow-lg disabled:opacity-50">
          <p className="text-xl font-bold text-gray-900">I'm hiring</p>
          <p className="mt-2 text-sm text-gray-600">Post jobs and manage candidates.</p>
        </button>
      </div>
    </div>
  );
}