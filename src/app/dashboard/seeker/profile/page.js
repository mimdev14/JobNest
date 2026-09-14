"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function SeekerProfilePage() {
  const [form, setForm] = useState({
    headline: "", bio: "", location: "", phone: "", skills: "",
    portfolioUrl: "", github: "", linkedin: "", resumeUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch("/api/auth/me").then((data) => {
      const p = data.user.profile || {};
      setForm({
        headline: p.headline || "", bio: p.bio || "", location: p.location || "",
        phone: p.phone || "", skills: (p.skills || []).join(", "),
        portfolioUrl: p.portfolioUrl || "", github: p.github || "", linkedin: p.linkedin || "",
        resumeUrl: p.resumeUrl || "",
      });
    }).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiFetch("/api/auth/profile", {
        method: "PATCH",
        body: JSON.stringify({ ...form, skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean) }),
      });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input placeholder="Headline (e.g. Frontend Developer)" value={form.headline}
          onChange={(e) => setForm({ ...form, headline: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <textarea rows={4} placeholder="Bio" value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Location" value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
          <input placeholder="Phone" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <input placeholder="Skills (comma separated)" value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <input placeholder="Portfolio URL" value={form.portfolioUrl}
          onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="GitHub URL" value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
          <input placeholder="LinkedIn URL" value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <input placeholder="Resume URL (PDF link)" value={form.resumeUrl}
          onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />

        <button type="submit" disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}