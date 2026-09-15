"use client";

import { useState } from "react";
import Link from "next/link";

const SEEKER_PLANS = [
  { name: "Free", price: "$0", features: ["3 applications/month", "10 saved jobs", "Basic profile"] },
  { name: "Pro", price: "$19", features: ["30 applications/month", "Unlimited saved jobs", "Application tracking", "Salary insights"], highlight: true },
  { name: "Premium", price: "$39", features: ["Unlimited applications", "Profile boost", "Early job access", "Priority support"] },
];

const RECRUITER_PLANS = [
  { name: "Free", price: "$0", features: ["3 active jobs", "Basic applicant management"] },
  { name: "Growth", price: "$49", features: ["10 active jobs", "Applicant tracking", "Basic analytics"], highlight: true },
  { name: "Enterprise", price: "$149", features: ["50 active jobs", "Advanced analytics", "Featured listings", "Team collaboration", "Custom branding"] },
];

export default function PricingPage() {
  const [tab, setTab] = useState("seeker");
  const plans = tab === "seeker" ? SEEKER_PLANS : RECRUITER_PLANS;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
        <p className="mt-3 text-gray-500">Choose the plan that fits how you use JobNest.</p>
      </div>

      <div className="mx-auto mt-8 flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
        <button onClick={() => setTab("seeker")} className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === "seeker" ? "bg-white shadow-sm" : "text-gray-500"}`}>Job Seekers</button>
        <button onClick={() => setTab("recruiter")} className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === "recruiter" ? "bg-white shadow-sm" : "text-gray-500"}`}>Recruiters</button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-2xl border p-8 ${p.highlight ? "border-blue-600 shadow-lg" : "border-gray-200"}`}>
            <p className="text-sm font-semibold text-gray-500">{p.name}</p>
            <p className="mt-2 text-4xl font-bold text-gray-900">{p.price}<span className="text-base font-normal text-gray-400">/mo</span></p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-gray-600">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="text-blue-600">✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth/register" className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${p.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}