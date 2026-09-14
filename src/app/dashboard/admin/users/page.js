"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => apiFetch("/api/users/admin/all").then((d) => setUsers(d.users)).catch(() => setUsers([])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const toggleSuspend = async (u) => {
    try {
      await apiFetch(`/api/users/admin/${u._id}/${u.status === "suspended" ? "activate" : "suspend"}`, { method: "PATCH" });
      toast.success(u.status === "suspended" ? "User activated" : "User suspended");
      setUsers((prev) => prev.map((x) => (x._id === u._id ? { ...x, status: u.status === "suspended" ? "active" : "suspended" } : x)));
    } catch (err) {
      toast.error(err.message || "Failed to update user");
    }
  };

  const changeRole = async (u, role) => {
    try {
      await apiFetch(`/api/users/admin/${u._id}/role`, { method: "PATCH", body: JSON.stringify({ role }) });
      toast.success("Role updated");
      setUsers((prev) => prev.map((x) => (x._id === u._id ? { ...x, role } : x)));
    } catch (err) {
      toast.error(err.message || "Failed to update role");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Name</th>
              <th className="px-5 py-3.5 font-semibold">Email</th>
              <th className="px-5 py-3.5 font-semibold">Role</th>
              <th className="px-5 py-3.5 font-semibold">Status</th>
              <th className="px-5 py-3.5 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-gray-100">
                <td className="px-5 py-3.5">{u.name}</td>
                <td className="px-5 py-3.5 text-gray-500">{u.email}</td>
                <td className="px-5 py-3.5">
                  {u.role === "ADMIN" ? (
                    <span className="rounded-full bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white">ADMIN</span>
                  ) : (
                    <select value={u.role} onChange={(e) => changeRole(u, e.target.value)} className="rounded-lg border border-gray-300 px-2 py-1 text-xs">
                      <option value="SEEKER">SEEKER</option>
                      <option value="RECRUITER">RECRUITER</option>
                    </select>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${u.status === "suspended" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {u.status === "suspended" ? "Suspended" : "Active"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  {u.role !== "ADMIN" && (
                    <button onClick={() => toggleSuspend(u)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50">
                      {u.status === "suspended" ? "Activate" : "Suspend"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}