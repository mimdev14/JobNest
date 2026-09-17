"use client";

import { useCurrentUser } from "@/lib/useCurrentUser";
import { useSession } from "@/lib/auth-client";

export default function DashboardRedirect() {
  const { user, loading, hasSession } = useCurrentUser();
  const { data: session, isPending } = useSession();

  return (
    <div className="mx-auto max-w-xl p-10 font-mono text-sm">
      <h1 className="mb-4 text-xl font-bold">Debug Info</h1>
      <p>session isPending: {String(isPending)}</p>
      <p>session data: {JSON.stringify(session)}</p>
      <hr className="my-4" />
      <p>hasSession: {String(hasSession)}</p>
      <p>loading: {String(loading)}</p>
      <p>user: {JSON.stringify(user)}</p>
    </div>
  );
}