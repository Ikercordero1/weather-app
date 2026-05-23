import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "WeatherScope — Clima en Tiempo Real",
  description: "Consulta el clima de ciudades del mundo con datos de Open-Meteo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="py-8 text-center border-t border-theme">
              <p className="text-muted font-body text-sm">
                Datos meteorológicos provistos por{" "}
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2"
                >
                  Open-Meteo
                </a>{" "}
                · API abierta y gratuita
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
