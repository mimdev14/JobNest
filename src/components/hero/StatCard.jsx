export default function StatCard({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 transition-colors duration-300 group-hover:bg-blue-600">
        <Icon className="h-7 w-7 text-black transition-colors duration-300 group-hover:text-white" />
      </div>

      {/* Number */}
      <h3 className="text-3xl font-bold text-slate-900">
        {value}
      </h3>

      {/* Label */}
      <p className="mt-2 text-sm font-medium text-slate-600">
        {label}
      </p>
    </div>
  );
}