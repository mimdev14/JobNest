"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { SEEKER_PLANS, RECRUITER_PLANS } from "@/lib/constants";

export default function PricingPage() {
  const router = useRouter();
  const { user, hasSession } = useCurrentUser();

  const defaultTab = user?.role === "RECRUITER" ? "recruiter" : "seeker";
  const [tab, setTab] = useState(defaultTab);
  const [currentPlanKey, setCurrentPlanKey] = useState(null);
  const [checkingOut, setCheckingOut] = useState(null);

  useEffect(() => {
    if (user?.role === "RECRUITER") setTab("recruiter");
  }, [user?.role]);

  useEffect(() => {
    if (!hasSession) return;
    apiFetch("/api/subscriptions/me").then((data) => setCurrentPlanKey(data.plan.key)).catch(() => {});
  }, [hasSession]);

  const plans = tab === "seeker" ? SEEKER_PLANS : RECRUITER_PLANS;
  const tabMatchesRole = !hasSession || (tab === "seeker" ? user?.role === "SEEKER" : user?.role === "RECRUITER");

  const handleCTA = async (planKey, price) => {
    if (!hasSession) {
      router.push("/auth/register");
      return;
    }
    if (!tabMatchesRole) return;
    if (price === 0) {
      router.push(tab === "seeker" ? "/dashboard/seeker/billing" : "/dashboard/recruiter/billing");
      return;
    }
    setCheckingOut(planKey);
    try {
      const data = await apiFetch("/api/subscriptions/checkout", { method: "POST", body: JSON.stringify({ planKey }) });
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.message || "Failed to start checkout");
      setCheckingOut(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
        <p className="mt-3 text-gray-500">Choose the plan that fits how you use JobNest.</p>
      </div>

      <div className="mx-auto mt-8 flex w-fit gap-2 rounded-lg bg-gray-100 p-1" role="tablist" aria-label="Pricing audience">
        <button
          role="tab"
          aria-selected={tab === "seeker"}
          onClick={() => setTab("seeker")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${tab === "seeker" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        >
          Job Seekers
        </button>
        <button
          role="tab"
          aria-selected={tab === "recruiter"}
          onClick={() => setTab("recruiter")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${tab === "recruiter" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
        >
          Recruiters
        </button>
      </div>

      {hasSession && !tabMatchesRole && (
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-gray-500">
          You're signed in as a {user?.role === "RECRUITER" ? "recruiter" : "job seeker"} — these plans are shown for reference only.
        </p>
      )}

      <div className="mt-12 grid gap-6 sm:grid-cols-3" role="tabpanel">
        {plans.map((p) => {
          const isCurrent = hasSession && tabMatchesRole && currentPlanKey === p.key;
          const isCheckingOutThis = checkingOut === p.key;

          return (
            <div key={p.key} className={`rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg ${p.highlight ? "border-blue-600 shadow-lg" : "border-gray-200"}`}>
              <p className="text-sm font-semibold text-gray-500">{p.name}</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">${p.price}<span className="text-base font-normal text-gray-400">/mo</span></p>
              <ul className="mt-6 flex flex-col gap-3 text-sm text-gray-600">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-blue-600">✓</span>{f}</li>
                ))}
              </ul>

              {isCurrent ? (
                <span className="mt-8 block rounded-lg bg-gray-100 px-4 py-2.5 text-center text-sm font-semibold text-gray-500">
                  Current Plan
                </span>
              ) : !hasSession ? (
                <Link
                  href="/auth/register"
                  className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${p.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  Get Started
                </Link>
              ) : (
                <button
                  onClick={() => handleCTA(p.key, p.price)}
                  disabled={!tabMatchesRole || isCheckingOutThis}
                  className={`mt-8 w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${p.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  {isCheckingOutThis ? "Redirecting..." : p.price === 0 ? "Go to Billing" : "Upgrade"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}