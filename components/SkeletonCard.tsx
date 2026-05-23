export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="shimmer h-4 w-24 rounded mb-4" />
      <div className="shimmer h-12 w-32 rounded mb-2" />
      <div className="shimmer h-4 w-40 rounded" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="shimmer h-8 w-8 rounded-full" />
      <div className="flex-1">
        <div className="shimmer h-3 w-24 rounded mb-1" />
        <div className="shimmer h-3 w-16 rounded" />
      </div>
      <div className="shimmer h-6 w-12 rounded" />
    </div>
  );
}
