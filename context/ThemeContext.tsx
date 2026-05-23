"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
theme: Theme;
toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
const [theme, setTheme] = useState<Theme>("light");
const [mounted, setMounted] = useState(false);

useEffect(() => {
setMounted(true);
const stored = localStorage.getItem("theme") as Theme | null;
if (stored === "dark" || stored === "light") {
setTheme(stored);
document.documentElement.classList.toggle("dark", stored === "dark");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
setTheme("dark");
document.documentElement.classList.add("dark");
}
}, []);

const toggleTheme = () => {
const next: Theme = theme === "light" ? "dark" : "light";
setTheme(next);
localStorage.setItem("theme", next);
document.documentElement.classList.toggle("dark", next === "dark");
};

if (!mounted) {
return (
<ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>
<div style={{ visibility: "hidden" }}>{children}</div>
</ThemeContext.Provider>
);
}

return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
{children}
</ThemeContext.Provider>
);
}

export function useTheme(): ThemeContextType {
const context = useContext(ThemeContext);
if (!context) {
throw new Error("useTheme debe usarse dentro de ThemeProvider");
}
return context;
}
