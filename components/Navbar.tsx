"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/weather", label: "Explorar" },

  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-theme"
      style={{ backgroundColor: "var(--bg-card)" }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🌤️</span>
          <span
            className="font-display font-bold text-xl text-primary"
            style={{ letterSpacing: "-0.02em" }}
          >
            WeatherScope
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-accent-light text-accent"
                  : "text-secondary hover:text-primary hover:bg-accent-light"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-accent-light border border-theme"
            aria-label="Cambiar tema"
            title={theme === "light" ? "Modo oscuro" : "Modo claro"}
          >
            <span className="text-lg">{theme === "light" ? "🌙" : "☀️"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
