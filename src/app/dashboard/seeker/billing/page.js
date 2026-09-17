"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const PLANS = [
  { key: "free", name: "Free", price: 0, features: ["3 applications/month", "10 saved jobs", "Basic profile"] },
  { key: "pro", name: "Pro", price: 19, features: ["30 applications/month", "Unlimited saved jobs", "Application tracking", "Salary insights"] },
  { key: "premium", name: "Premium", price: 39, features: ["Unlimited applications", "Profile boost", "Early job access", "Priority support"] },
];

export default function SeekerBillingPage() {
  const [currentPlan, setCurrentPlan] = useState("free");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(null);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/subscriptions/me"),
      apiFetch("/api/subscriptions/payments/mine"),
    ]).then(([subData, payData]) => {
      setCurrentPlan(subData.plan.key);
      setPayments(payData.payments);
    }).finally(() => setLoading(false));
  }, []);

  const handleUpgrade = async (planKey) => {
    setCheckingOut(planKey);
    try {
      const data = await apiFetch("/api/subscriptions/checkout", { method: "POST", body: JSON.stringify({ planKey }) });
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.message || "Failed to start checkout");
      setCheckingOut(null);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
      <p className="mt-2 text-sm text-gray-500">Current plan: <span className="font-semibold capitalize text-blue-600">{currentPlan}</span></p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.key} className={`rounded-2xl border p-6 ${currentPlan === p.key ? "border-blue-600 shadow-lg" : "border-gray-200"}`}>
            <p className="text-sm font-semibold text-gray-500">{p.name}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">${p.price}<span className="text-sm font-normal text-gray-400">/mo</span></p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
              {p.features.map((f) => <li key={f} className="flex items-center gap-2"><span className="text-blue-600">✓</span>{f}</li>)}
            </ul>
            {currentPlan === p.key ? (
              <span className="mt-6 block rounded-lg bg-gray-100 px-4 py-2.5 text-center text-sm font-semibold text-gray-500">Current Plan</span>
            ) : p.price === 0 ? null : (
              <button onClick={() => handleUpgrade(p.key)} disabled={checkingOut === p.key}
                className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
                {checkingOut === p.key ? "Redirecting..." : "Upgrade"}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
        {payments.length === 0 ? (
          <p className="mt-4 text-gray-500">No payments yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.transactionId} className="border-t border-gray-100">
                    <td className="px-4 py-3 capitalize">{p.plan}</td>
                    <td className="px-4 py-3">${p.amount}</td>
                    <td className="px-4 py-3">{new Date(p.paidAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">{p.paymentStatus}</span></td>
                    <td className="px-4 py-3 text-xs text-gray-400">{p.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}