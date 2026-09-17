"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/useCurrentUser";

const ROLE_DASHBOARD = { SEEKER: "/dashboard/seeker", RECRUITER: "/dashboard/recruiter", ADMIN: "/dashboard/admin" };

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, loading, hasSession } = useCurrentUser();

  useEffect(() => {
    if (loading) return;
    if (!hasSession) {
      router.replace("/auth/login?redirect=/dashboard");
      return;
    }
    router.replace(ROLE_DASHBOARD[user?.role] || "/dashboard");
  }, [loading, hasSession, user]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
    </div>
  );
}