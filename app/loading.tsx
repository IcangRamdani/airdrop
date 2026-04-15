export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950/95 p-8 text-slate-200">
      <div className="container flex min-h-[70vh] items-center justify-center">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-10 text-center shadow-glow">
          <p className="text-lg font-semibold">Loading DropHub…</p>
          <div className="mt-6 h-1.5 w-48 rounded-full bg-violet-500/30 shadow-inner animate-pulse" />
        </div>
      </div>
    </div>
  );
}
