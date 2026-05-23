"use client";

import Link from "next/link";
import { City } from "@/lib/weather";

interface CityCardProps {
  city: City;
  index: number;
}

export default function CityCard({ city, index }: CityCardProps) {
  return (
    <Link
      href={`/weather?city=${encodeURIComponent(city.name)}`}
      className="card p-5 hover:scale-[1.02] transition-all duration-200 hover:shadow-lg group block"
      style={{ animation: `slideUp 0.4s ease ${index * 0.07}s both` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{city.emoji}</span>
        <span className="text-xs font-body text-muted border border-theme rounded-full px-2 py-0.5">
          Ver clima
        </span>
      </div>
      <h3 className="font-display font-semibold text-primary text-lg leading-tight">
        {city.name}
      </h3>
      <p className="text-secondary font-body text-sm mt-0.5">{city.country}</p>
      <div className="mt-3 text-xs font-mono text-muted">
        {city.latitude.toFixed(2)}° N · {city.longitude.toFixed(2)}° E
      </div>
    </Link>
  );
}
