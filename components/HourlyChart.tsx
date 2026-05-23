"use client";

import { WeatherHourly, formatHour, getWeatherIcon } from "@/lib/weather";
import { useRef } from "react";

interface HourlyChartProps {
  hourly: WeatherHourly;
}

export default function HourlyChart({ hourly }: HourlyChartProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show next 24 hours only
  const now = new Date();
  const currentHour = now.getHours();
  const startIdx = hourly.time.findIndex((t) => {
    const h = new Date(t).getHours();
    return h >= currentHour;
  });
  const slice = hourly.time.slice(startIdx, startIdx + 24);
  const temps = hourly.temperature_2m.slice(startIdx, startIdx + 24);
  const precip = hourly.precipitation_probability.slice(startIdx, startIdx + 24);
  const codes = hourly.weather_code.slice(startIdx, startIdx + 24);

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  return (
    <div className="card p-6">
      <h3 className="font-display font-semibold text-primary mb-4">
        Próximas 24 horas
      </h3>
      <div ref={scrollRef} className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {slice.map((time, i) => {
            const heightPct = ((temps[i] - minTemp) / range) * 60 + 20;
            return (
              <div
                key={time}
                className="flex flex-col items-center gap-1 w-14"
                style={{ animation: `fadeIn 0.5s ease ${i * 0.03}s both` }}
              >
                <span className="text-muted font-mono text-xs">
                  {formatHour(time)}
                </span>
                <span className="text-base">{getWeatherIcon(codes[i])}</span>
                {/* Temp bar */}
                <div className="w-1 bg-theme rounded-full relative" style={{ height: "80px" }}>
                  <div
                    className="absolute bottom-0 w-full rounded-full transition-all duration-500"
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: "var(--accent)",
                      opacity: 0.7,
                    }}
                  />
                </div>
                <span className="text-primary font-mono text-xs font-medium">
                  {Math.round(temps[i])}°
                </span>
                {precip[i] > 0 && (
                  <span className="text-xs font-body" style={{ color: "#93c5e8" }}>
                    {precip[i]}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
