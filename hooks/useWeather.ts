"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchWeather, WeatherData } from "@/lib/weather";

interface UseWeatherReturn {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWeather(lat: number, lon: number): UseWeatherReturn {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchWeather(lat, lon);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}
