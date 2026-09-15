import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-8xl">🔍</p>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-blue-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-3 text-gray-600">The page you're looking for doesn't exist or may have moved.</p>
      <Link href="/" className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
        Back to Home
      </Link>
    </div>
  );
}