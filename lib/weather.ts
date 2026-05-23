export interface WeatherCurrent {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  weather_code: number;
  is_day: number;
  precipitation: number;
  surface_pressure: number;
  visibility: number;
}

export interface WeatherHourly {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
}

export interface WeatherDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: WeatherCurrent;
  hourly: WeatherHourly;
  daily: WeatherDaily;
}

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  emoji: string;
}

export const CITIES: City[] = [
  { name: "Madrid", country: "España", latitude: 40.4168, longitude: -3.7038, emoji: "🇪🇸" },
  { name: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816, emoji: "🇦🇷" },
  { name: "Ciudad de México", country: "México", latitude: 19.4326, longitude: -99.1332, emoji: "🇲🇽" },
  { name: "Bogotá", country: "Colombia", latitude: 4.711, longitude: -74.0721, emoji: "🇨🇴" },
  { name: "Lima", country: "Perú", latitude: -12.0464, longitude: -77.0428, emoji: "🇵🇪" },
  { name: "Santiago", country: "Chile", latitude: -33.4489, longitude: -70.6693, emoji: "🇨🇱" },
  { name: "Tokyo", country: "Japón", latitude: 35.6762, longitude: 139.6503, emoji: "🇯🇵" },
  { name: "París", country: "Francia", latitude: 48.8566, longitude: 2.3522, emoji: "🇫🇷" },
];

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day,precipitation,surface_pressure,visibility"
  );
  url.searchParams.set(
    "hourly",
    "temperature_2m,precipitation_probability,weather_code"
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset"
  );
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString(), { next: { revalidate: 900 } });
  if (!res.ok) throw new Error("Error al obtener datos del clima");
  return res.json();
}

export function getWeatherLabel(code: number): string {
  if (code === 0) return "Despejado";
  if (code <= 3) return "Parcialmente nublado";
  if (code <= 9) return "Niebla";
  if (code <= 19) return "Llovizna";
  if (code <= 29) return "Lluvia";
  if (code <= 39) return "Nieve";
  if (code <= 49) return "Ventisca";
  if (code <= 59) return "Llovizna";
  if (code <= 69) return "Lluvia";
  if (code <= 79) return "Nevada";
  if (code <= 84) return "Aguanieve";
  if (code <= 94) return "Tormenta";
  return "Tormenta severa";
}

export function getWeatherIcon(code: number, isDay = true): string {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code <= 3) return isDay ? "⛅" : "🌤️";
  if (code <= 9) return "🌫️";
  if (code <= 49) return "🌧️";
  if (code <= 79) return "❄️";
  if (code <= 84) return "🌨️";
  return "⛈️";
}

export function getWindDirection(degrees: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  return dirs[Math.round(degrees / 45) % 8];
}

export function formatDay(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" });
}

export function formatHour(timeStr: string): string {
  return timeStr.split("T")[1]?.slice(0, 5) ?? timeStr;
}
