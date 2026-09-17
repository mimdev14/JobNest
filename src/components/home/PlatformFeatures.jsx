const FEATURES = [
  { icon: "🎯", title: "Smart Job Search", desc: "Filter by category, location, salary, and experience to find the perfect match." },
  { icon: "📊", title: "Application Tracking", desc: "Track every application's status from submission to offer, all in one place." },
  { icon: "🏢", title: "Verified Companies", desc: "Every company is reviewed before their jobs go live, so you can apply with confidence." },
  { icon: "⚡", title: "Fast Hiring Pipeline", desc: "Recruiters manage candidates through a visual pipeline, from applied to hired." },
];

export default function PlatformFeatures() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Why JobNest</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Built for Job Seekers and Recruiters</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-gray-100 p-6 transition hover:shadow-md">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}