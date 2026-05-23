import Link from "next/link";
import { CITIES } from "@/lib/weather";

export default function HomePage() {
  const featured = CITIES.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Hero */}
      <div
        className="text-center mb-20"
        style={{ animation: "fadeIn 0.8s ease both" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-theme bg-accent-light mb-6">
          <span className="text-sm">🌐</span>
          <span className="text-accent font-body text-sm font-medium">
            Open-Meteo API · Datos en tiempo real
          </span>
        </div>

        <h1
          className="font-display font-black text-primary leading-[0.95] mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.03em" }}
        >
          El clima del
          <br />
          <span className="text-accent">mundo entero</span>
          <br />
          en un vistazo.
        </h1>

        <p className="text-secondary font-body text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Datos meteorológicos precisos de cualquier ciudad: temperatura, humedad,
          viento, pronóstico horario y semanal.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/weather"
            className="px-7 py-3 rounded-xl font-body font-semibold text-base transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
            }}
          >
            Explorar ciudades →
          </Link>
          <Link
            href="/about"
            className="px-7 py-3 rounded-xl font-body font-medium text-base card hover:scale-105 transition-all duration-200 text-secondary"
          >
            Cómo funciona
          </Link>
        </div>
      </div>

      {/* Featured cities */}
      <div>
        <h2 className="font-display font-semibold text-primary text-2xl mb-6">
          Ciudades destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featured.map((city, i) => (
            <Link
              key={city.name}
              href={`/weather?city=${encodeURIComponent(city.name)}`}
              className="card p-6 hover:scale-[1.02] transition-all duration-200 group"
              style={{ animation: `slideUp 0.5s ease ${i * 0.1}s both` }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl">{city.emoji}</span>
                <span className="text-xs font-body font-medium text-accent border border-theme rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver →
                </span>
              </div>
              <h3 className="font-display font-bold text-primary text-xl">{city.name}</h3>
              <p className="text-secondary font-body text-sm">{city.country}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Features grid */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: "📡", title: "API en tiempo real", desc: "Datos actualizados cada 15 minutos desde estaciones meteorológicas globales." },
          { icon: "🌙", title: "Modo claro / oscuro", desc: "Interfaz adaptable a tus preferencias, con transición suave entre temas." },
          { icon: "📊", title: "Gráficos interactivos", desc: "Pronóstico horario y semanal con visualización clara y elegante." },
        ].map((feat, i) => (
          <div
            key={feat.title}
            className="card p-6"
            style={{ animation: `slideUp 0.5s ease ${i * 0.12}s both` }}
          >
            <span className="text-3xl block mb-3">{feat.icon}</span>
            <h3 className="font-display font-semibold text-primary text-lg mb-2">{feat.title}</h3>
            <p className="text-secondary font-body text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
