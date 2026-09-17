const STEPS = [
  { title: "Create your profile", desc: "Sign up and build a profile that highlights your skills and experience." },
  { title: "Discover opportunities", desc: "Search and filter thousands of jobs tailored to what you're looking for." },
  { title: "Apply with confidence", desc: "Submit applications, track their status, and get hired faster." },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Simple Process</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">How JobNest Works</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">{i + 1}</div>
              <h3 className="mt-4 font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}