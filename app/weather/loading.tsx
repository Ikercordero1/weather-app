export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="shimmer h-10 w-48 rounded mb-2" />
        <div className="shimmer h-4 w-64 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card p-5 space-y-3">
            <div className="shimmer h-10 w-10 rounded-full" />
            <div className="shimmer h-5 w-24 rounded" />
            <div className="shimmer h-3 w-16 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
