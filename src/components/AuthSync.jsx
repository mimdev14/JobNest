"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { syncUser } from "@/lib/sync-user";

export default function AuthSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      syncUser(session.user);
    }
  }, [session?.user?.id]);

  return null;
}