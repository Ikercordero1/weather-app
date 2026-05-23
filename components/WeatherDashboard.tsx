"use client";

import { useWeather } from "@/hooks/useWeather";
import { City, getWeatherIcon, getWeatherLabel, getWindDirection } from "@/lib/weather";
import StatBadge from "./StatBadge";
import DailyForecast from "./DailyForecast";
import HourlyChart from "./HourlyChart";
import { SkeletonCard, SkeletonRow } from "./SkeletonCard";

interface WeatherDashboardProps {
  city: City;
}

export default function WeatherDashboard({ city }: WeatherDashboardProps) {
  const { data, loading, error, refetch } = useWeather(city.latitude, city.longitude);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <SkeletonCard className="h-48" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <SkeletonCard>
          {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
        </SkeletonCard>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <p className="text-4xl mb-3">⚠️</p>
        <p className="text-primary font-display font-semibold text-lg mb-2">
          Error al cargar datos
        </p>
        <p className="text-secondary font-body text-sm mb-4">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 rounded-lg text-sm font-body font-medium text-accent border border-theme hover:bg-accent-light transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) return null;

  const { current, hourly, daily } = data;
  const icon = getWeatherIcon(current.weather_code, current.is_day === 1);
  const label = getWeatherLabel(current.weather_code);
  const windDir = getWindDirection(current.wind_direction_10m);

  return (
    <div className="space-y-4">
      {/* Hero card */}
      <div
        className="card p-6 sm:p-8 relative overflow-hidden"
        style={{ animation: "slideUp 0.5s ease both" }}
      >
        {/* Decorative blob */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
          style={{ backgroundColor: "var(--accent)" }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{city.emoji}</span>
              <span className="font-body text-secondary text-sm">{city.country}</span>
            </div>
            <h2 className="font-display font-bold text-primary text-4xl sm:text-5xl leading-none">
              {city.name}
            </h2>
            <p className="text-secondary font-body text-sm mt-2">{label}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-6xl sm:text-7xl">{icon}</span>
            <div>
              <p
                className="font-display font-black text-primary leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
              >
                {Math.round(current.temperature_2m)}°
                <span className="text-2xl font-body font-light text-secondary">C</span>
              </p>
              <p className="text-muted font-body text-sm mt-1">
                Sensación {Math.round(current.apparent_temperature)}°C
              </p>
            </div>
          </div>
        </div>

        {/* Sunrise / Sunset */}
        <div className="flex gap-4 mt-6 pt-4 border-t border-theme">
          <span className="text-muted font-body text-xs">
            🌅 Amanecer: <strong className="text-secondary">{daily.sunrise[0]?.split("T")[1]}</strong>
          </span>
          <span className="text-muted font-body text-xs">
            🌇 Atardecer: <strong className="text-secondary">{daily.sunset[0]?.split("T")[1]}</strong>
          </span>
          <button
            onClick={refetch}
            className="ml-auto text-xs font-body text-muted hover:text-accent transition-colors"
            title="Actualizar datos"
          >
            ↻ Actualizar
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        style={{ animation: "slideUp 0.5s ease 0.1s both" }}
      >
        <StatBadge icon="💧" label="Humedad" value={`${current.relative_humidity_2m}%`} />
        <StatBadge icon="💨" label="Viento" value={`${Math.round(current.wind_speed_10m)} km/h ${windDir}`} />
        <StatBadge icon="🌡️" label="Presión" value={`${Math.round(current.surface_pressure)} hPa`} />
        <StatBadge icon="🌧️" label="Precipitación" value={`${current.precipitation} mm`} />
      </div>

      {/* Hourly chart */}
      <div style={{ animation: "slideUp 0.5s ease 0.2s both" }}>
        <HourlyChart hourly={hourly} />
      </div>

      {/* Daily forecast */}
      <div style={{ animation: "slideUp 0.5s ease 0.3s both" }}>
        <DailyForecast daily={daily} />
      </div>
    </div>
  );
}
