import { WeatherDaily, getWeatherIcon, getWeatherLabel, formatDay } from "@/lib/weather";

interface DailyForecastProps {
  daily: WeatherDaily;
}

export default function DailyForecast({ daily }: DailyForecastProps) {
  return (
    <div className="card p-6">
      <h3 className="font-display font-semibold text-primary mb-4">
        Pronóstico 7 días
      </h3>
      <div className="space-y-1">
        {daily.time.map((day, i) => (
          <div
            key={day}
            className="flex items-center gap-3 py-2.5 border-b border-theme last:border-0"
            style={{ animation: `slideUp 0.4s ease ${i * 0.05}s both` }}
          >
            <span className="text-xl w-8">{getWeatherIcon(daily.weather_code[i])}</span>
            <span className="text-secondary font-body text-sm w-20 capitalize">
              {i === 0 ? "Hoy" : formatDay(day)}
            </span>
            <span className="text-muted font-body text-xs flex-1">
              {getWeatherLabel(daily.weather_code[i])}
            </span>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-accent font-medium">
                {Math.round(daily.temperature_2m_max[i])}°
              </span>
              <span className="text-muted">
                {Math.round(daily.temperature_2m_min[i])}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
