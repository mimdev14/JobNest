export default function BackgroundEffects() {
  return (
    <>
      {/* Main Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Glow 1 */}
      <div className="absolute left-10 top-16 h-80 w-80 rounded-full bg-blue-500/30 blur-[120px]" />

      {/* Glow 2 */}
      <div className="absolute right-10 top-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-[140px]" />

      {/* Glow 3 */}
      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </>
  );
}