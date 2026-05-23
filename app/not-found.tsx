import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl mb-6">🌪️</p>
      <h1 className="font-display font-black text-primary text-5xl mb-3" style={{ letterSpacing: "-0.03em" }}>
        404
      </h1>
      <p className="text-secondary font-body text-lg mb-8">
        Esta página se la llevó el viento.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all hover:scale-105"
        style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
