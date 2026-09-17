import Link from "next/link";

const PLANS = [
  { name: "Free", price: "$0", desc: "3 applications/month, 10 saved jobs" },
  { name: "Pro", price: "$19", desc: "30 applications/month, application tracking", highlight: true },
  { name: "Premium", price: "$39", desc: "Unlimited applications, profile boost" },
];

export default function PricingPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Pricing</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Plans for Every Job Search</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`rounded-2xl border p-8 text-center ${p.highlight ? "border-blue-600 shadow-lg" : "border-gray-200"}`}>
              <p className="text-sm font-semibold text-gray-500">{p.name}</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">{p.price}<span className="text-base font-normal text-gray-400">/mo</span></p>
              <p className="mt-4 text-sm text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/pricing" className="text-sm font-semibold text-blue-600 hover:text-blue-700">See full pricing →</Link>
        </div>
      </div>
    </section>
  );
}