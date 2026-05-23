# 🌤️ WeatherScope

Aplicación meteorológica construida con **Next.js 14**, **Tailwind CSS** y la API abierta de **Open-Meteo**.

## Características

- ✅ **Componentes reutilizables** — Navbar, WeatherDashboard, StatBadge, DailyForecast, HourlyChart, CityCard, SkeletonCard
- ✅ **Hooks personalizados** — `useWeather` (fetching + estados), `useLocalStorage` (persistencia)
- ✅ **next/navigation** — `useRouter`, `useSearchParams`, `usePathname` para rutas dinámicas
- ✅ **Modo Claro / Oscuro** — implementado con `useContext` (`ThemeContext`)
- ✅ **Diseño responsive** — Mobile-first con Tailwind CSS
- ✅ **TypeScript** — tipado completo en toda la app
- ✅ **API real** — Open-Meteo (gratuita, sin API key)

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Estructura

```
weather-app/
├── app/
│   ├── layout.tsx          ← Layout raíz + ThemeProvider
│   ├── page.tsx            ← Página de inicio
│   ├── globals.css
│   ├── weather/
│   │   ├── page.tsx        ← Explorador de ciudades
│   │   └── loading.tsx     ← Skeleton de carga
│   ├── about/
│   │   └── page.tsx        ← Documentación
│   └── not-found.tsx       ← Página 404
├── components/
│   ├── Navbar.tsx
│   ├── WeatherDashboard.tsx
│   ├── DailyForecast.tsx
│   ├── HourlyChart.tsx
│   ├── StatBadge.tsx
│   ├── CityCard.tsx
│   └── SkeletonCard.tsx
├── context/
│   └── ThemeContext.tsx    ← useContext para tema
├── hooks/
│   ├── useWeather.ts
│   └── useLocalStorage.ts
└── lib/
    └── weather.ts          ← Tipos + fetch + utilidades
```

## API utilizada

**Open-Meteo** — https://open-meteo.com  
- Gratuita, sin registro, sin API key
- Datos horarios y diarios de temperatura, viento, humedad, precipitación, etc.
- Endpoint: `https://api.open-meteo.com/v1/forecast`

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con ciudades destacadas |
| `/weather` | Explorador de todas las ciudades |
| `/weather?city=Madrid` | Dashboard de clima de una ciudad específica |
| `/about` | Documentación técnica del proyecto |

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build de producción
npm run start    # Iniciar en producción
npm run lint     # Linter
```
