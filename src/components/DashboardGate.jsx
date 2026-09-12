"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/useCurrentUser";

const ROLE_HOME = {
  SEEKER: "/dashboard/seeker",
  RECRUITER: "/dashboard/recruiter",
  ADMIN: "/dashboard/admin",
};

export default function DashboardGate({ allowedRole, children }) {
  const { user, loading, hasSession } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!hasSession) {
      router.push(`/auth/login?redirect=${ROLE_HOME[allowedRole]}`);
      return;
    }
    if (user && user.role !== allowedRole) {
      router.push(ROLE_HOME[user.role] || "/");
    }
  }, [loading, hasSession, user, allowedRole]);

  if (loading || !user || user.role !== allowedRole) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  return children;
}