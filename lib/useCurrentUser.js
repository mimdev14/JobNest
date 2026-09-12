"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export function useCurrentUser() {
  const { data: session, isPending: sessionPending } = useSession();
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (sessionPending || !session?.user) return;

    let cancelled = false;
    setFetching(true);

    apiFetch("/api/auth/me")
      .then((data) => { if (!cancelled) setUser(data.user); })
      .catch(() => { if (!cancelled) setUser(null); })
      .finally(() => { if (!cancelled) setFetching(false); });

    return () => { cancelled = true; };
  }, [sessionPending, session?.user?.id]);

  const hasSession = !!session?.user;
  const effectiveUser = hasSession ? user : null;
  const loading = sessionPending || (hasSession && fetching);

  return { user: effectiveUser, loading, hasSession };
}