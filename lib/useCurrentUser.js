"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export function useCurrentUser() {
  const { data: session, isPending: sessionPending } = useSession();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (sessionPending) return;
    if (!session?.user) {
      setChecked(true);
      return;
    }

    let cancelled = false;
    setChecked(false);

    apiFetch("/api/auth/me")
      .then((data) => { if (!cancelled) setUser(data.user); })
      .catch(() => { if (!cancelled) setUser(null); })
      .finally(() => { if (!cancelled) setChecked(true); });

    return () => { cancelled = true; };
  }, [sessionPending, session?.user?.id]);

  const hasSession = !!session?.user;
  const effectiveUser = hasSession ? user : null;
  const loading = sessionPending || (hasSession && !checked);

  return { user: effectiveUser, loading, hasSession };
}