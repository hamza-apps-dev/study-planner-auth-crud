export default function LoadingSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse" id="loading-skeleton-container">
      {/* Metrics skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-slate-800 rounded"></div>
              <div className="h-8 w-8 bg-slate-800 rounded-lg"></div>
            </div>
            <div className="h-7 w-12 bg-slate-700/80 rounded"></div>
            <div className="h-3 w-28 bg-slate-800/60 rounded"></div>
          </div>
        ))}
      </div>

      {/* Filter bar skeleton */}
      <div className="h-12 w-full bg-slate-900/40 border border-slate-800/60 rounded-xl"></div>

      {/* Task cards skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 bg-slate-800 rounded-full"></div>
              <div className="h-5 w-16 bg-slate-800 rounded-full"></div>
            </div>
            <div className="h-6 w-3/4 bg-slate-700/80 rounded"></div>
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-800/70 rounded"></div>
              <div className="h-3.5 w-4/5 bg-slate-800/70 rounded"></div>
            </div>
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
              <div className="h-4 w-28 bg-slate-800/50 rounded"></div>
              <div className="flex gap-2">
                <div className="h-7 w-7 bg-slate-800 rounded-lg"></div>
                <div className="h-7 w-7 bg-slate-800 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
