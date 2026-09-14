"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const statusColor = { approved: "bg-green-100 text-green-700", pending: "bg-yellow-100 text-yellow-700", rejected: "bg-red-100 text-red-700", suspended: "bg-gray-200 text-gray-700" };

export default function ManageCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => apiFetch("/api/companies/admin/all").then((d) => setCompanies(d.companies)).catch(() => setCompanies([])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const act = async (id, action) => {
    try {
      await apiFetch(`/api/companies/admin/${id}/${action}`, { method: "PATCH" });
      toast.success(`Company ${action}d`);
      load();
    } catch (err) {
      toast.error(err.message || "Failed to update company");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Manage Companies</h1>
      <div className="mt-8 flex flex-col gap-4">
        {companies.map((c) => (
          <div key={c._id} className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5">
            <div>
              <p className="font-semibold text-gray-900">{c.name}</p>
              <p className="text-sm text-gray-500">{c.industry} · {c.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColor[c.status]}`}>{c.status}</span>
              {c.status === "pending" && (
                <>
                  <button onClick={() => act(c._id, "approve")} className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-50">Approve</button>
                  <button onClick={() => act(c._id, "reject")} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Reject</button>
                </>
              )}
              {c.status === "approved" && (
                <button onClick={() => act(c._id, "suspend")} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50">Suspend</button>
              )}
            </div>
          </div>
        ))}
        {companies.length === 0 && <p className="text-center text-gray-500">No companies yet.</p>}
      </div>
    </div>
  );
}