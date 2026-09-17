"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // small delay so webhook has time to process and update subscription in DB
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      {!visible ? (
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      ) : (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="mt-2 text-gray-500">Your subscription has been activated. Thank you for upgrading.</p>
          {sessionId && <p className="mt-3 text-xs text-gray-400">Reference: {sessionId}</p>}
          <Link href="/dashboard/seeker" className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            Go to Dashboard
          </Link>
        </>
      )}
    </div>
  );
}