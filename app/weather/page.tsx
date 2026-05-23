"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CITIES, City } from "@/lib/weather";
import CityCard from "@/components/CityCard";
import WeatherDashboard from "@/components/WeatherDashboard";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function WeatherPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cityParam = searchParams.get("city");

  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [recentCities, setRecentCities] = useLocalStorage<string[]>("recent-cities", []);

  useEffect(() => {
    if (cityParam) {
      const found = CITIES.find((c) => c.name === decodeURIComponent(cityParam));
      if (found) {
        setSelectedCity(found);
        // Save to recent
        setRecentCities((prev: string[]) => {
          const updated = [found.name, ...prev.filter((n: string) => n !== found.name)].slice(0, 3);
          return updated;
        });
      }
    } else {
      setSelectedCity(null);
    }
  }, [cityParam]);

  const handleSelectCity = (city: City) => {
    router.push(`/weather?city=${encodeURIComponent(city.name)}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-primary text-4xl mb-2" style={{ letterSpacing: "-0.02em" }}>
          {selectedCity ? selectedCity.name : "Explorar ciudades"}
        </h1>
        <p className="text-secondary font-body text-sm">
          {selectedCity
            ? `Datos meteorológicos en tiempo real · ${selectedCity.country}`
            : "Selecciona una ciudad para ver el clima actual"}
        </p>
      </div>

      {selectedCity ? (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar: city list */}
          <aside>
            <div className="card p-4 sticky top-20">
              <h2 className="font-body text-xs uppercase tracking-widest text-muted mb-3 px-1">
                Ciudades disponibles
              </h2>
              <div className="space-y-1">
                {CITIES.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleSelectCity(city)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-150 ${
                      selectedCity?.name === city.name
                        ? "bg-accent-light text-accent"
                        : "text-secondary hover:bg-accent-light hover:text-primary"
                    }`}
                  >
                    <span className="text-lg">{city.emoji}</span>
                    <div>
                      <p className="font-body text-sm font-medium leading-tight">{city.name}</p>
                      <p className="font-body text-xs text-muted">{city.country}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main: weather dashboard */}
          <div>
            <WeatherDashboard city={selectedCity} />
          </div>
        </div>
      ) : (
        <>
          {/* Recent cities */}
          {recentCities.length > 0 && (
            <div className="mb-8">
              <h2 className="font-body text-xs uppercase tracking-widest text-muted mb-3">
                Visitadas recientemente
              </h2>
              <div className="flex flex-wrap gap-2">
                {recentCities.map((name: string) => {
                  const city = CITIES.find((c) => c.name === name);
                  if (!city) return null;
                  return (
                    <button
                      key={name}
                      onClick={() => handleSelectCity(city)}
                      className="card px-4 py-2 flex items-center gap-2 hover:bg-accent-light transition-colors"
                    >
                      <span>{city.emoji}</span>
                      <span className="font-body text-sm text-primary">{city.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* City grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CITIES.map((city, i) => (
              <div key={city.name} onClick={() => handleSelectCity(city)}>
                <CityCard city={city} index={i} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
