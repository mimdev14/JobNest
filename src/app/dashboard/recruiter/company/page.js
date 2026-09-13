"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function CompanyProfilePage() {
  const [company, setCompany] = useState(null);
  const [form, setForm] = useState({ name: "", industry: "", website: "", location: "", employeeCount: "", logo: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch("/api/companies/mine")
      .then((data) => {
        if (data.company) {
          setCompany(data.company);
          setForm(data.company);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (company) {
        await apiFetch("/api/companies/mine", { method: "PATCH", body: JSON.stringify(form) });
        toast.success("Company profile updated");
      } else {
        const data = await apiFetch("/api/companies", { method: "POST", body: JSON.stringify(form) });
        setCompany(data.company);
        toast.success("Company submitted for review");
      }
    } catch (err) {
      toast.error(err.message || "Failed to save company");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        {company && (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            company.status === "approved" ? "bg-green-100 text-green-700" :
            company.status === "rejected" ? "bg-red-100 text-red-700" :
            company.status === "suspended" ? "bg-gray-200 text-gray-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {company.status}
          </span>
        )}
      </div>

      {company?.status === "pending" && (
        <p className="mt-3 rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
          Your company is awaiting admin approval. You can still create draft jobs, but publishing requires approval.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex max-w-2xl flex-col gap-4">
        <input required placeholder="Company name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <input required placeholder="Industry" value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <input required placeholder="Location" value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <input placeholder="Website" value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <input placeholder="Employee count (e.g. 50-200)" value={form.employeeCount}
          onChange={(e) => setForm({ ...form, employeeCount: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <input placeholder="Logo URL" value={form.logo}
          onChange={(e) => setForm({ ...form, logo: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <textarea rows={4} placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />

        <button type="submit" disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
          {saving ? "Saving..." : company ? "Save Changes" : "Submit for Review"}
        </button>
      </form>
    </div>
  );
}