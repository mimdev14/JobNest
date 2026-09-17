const TESTIMONIALS = [
  { name: "Sarah Ahmed", role: "Frontend Developer", quote: "JobNest helped me land a great remote role within weeks. The application tracker kept everything organized." },
  { name: "Michael Chen", role: "Hiring Manager, TechCo", quote: "The candidate pipeline made it so much easier to manage applicants across multiple open roles." },
  { name: "Priya Sharma", role: "Product Designer", quote: "Clean interface, relevant job matches, and a smooth application process. Highly recommend." },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Testimonials</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">What Our Users Say</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-gray-100 bg-white p-6">
              <p className="text-sm italic text-gray-600">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-gray-900">{t.name}</p>
              <p className="text-xs text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}