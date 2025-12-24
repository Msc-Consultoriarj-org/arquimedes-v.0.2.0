import React, { createContext, useContext, useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

type Theme = "light" | "dark";
type ThemeColor = "blue" | "red" | "green" | "purple" | "orange" | "pink" | "teal" | "indigo";

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  toggleTheme?: () => void;
  setThemeColor?: (color: ThemeColor) => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

// Mapeamento de cores para variáveis CSS (expandido com gradientes completos)
const COLOR_MAPPINGS: Record<ThemeColor, {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  gradientStart: string;
  gradientMiddle: string;
  gradientEnd: string;
  iconColor: string;
  badgeColor: string;
}> = {
  blue: {
    primary: "221.2 83.2% 53.3%",
    primaryForeground: "210 40% 98%",
    accent: "221.2 83.2% 93.3%",
    accentForeground: "221.2 83.2% 23.3%",
    gradientStart: "#2563eb", // blue-600
    gradientMiddle: "#4f46e5", // indigo-600
    gradientEnd: "#7c3aed", // purple-600
    iconColor: "#3b82f6", // blue-500
    badgeColor: "#60a5fa", // blue-400
  },
  red: {
    primary: "0 84.2% 60.2%",
    primaryForeground: "0 0% 100%",
    accent: "0 84.2% 95%",
    accentForeground: "0 84.2% 30%",
    gradientStart: "#dc2626", // red-600
    gradientMiddle: "#ea580c", // orange-600
    gradientEnd: "#f59e0b", // amber-500
    iconColor: "#ef4444", // red-500
    badgeColor: "#f87171", // red-400
  },
  green: {
    primary: "142.1 76.2% 36.3%",
    primaryForeground: "355.7 100% 97.3%",
    accent: "142.1 76.2% 90%",
    accentForeground: "142.1 76.2% 20%",
    gradientStart: "#16a34a", // green-600
    gradientMiddle: "#059669", // emerald-600
    gradientEnd: "#0d9488", // teal-600
    iconColor: "#22c55e", // green-500
    badgeColor: "#4ade80", // green-400
  },
  purple: {
    primary: "262.1 83.3% 57.8%",
    primaryForeground: "210 40% 98%",
    accent: "262.1 83.3% 93%",
    accentForeground: "262.1 83.3% 27%",
    gradientStart: "#9333ea", // purple-600
    gradientMiddle: "#a855f7", // purple-500
    gradientEnd: "#c026d3", // fuchsia-600
    iconColor: "#a855f7", // purple-500
    badgeColor: "#c084fc", // purple-400
  },
  orange: {
    primary: "24.6 95% 53.1%",
    primaryForeground: "60 9.1% 97.8%",
    accent: "24.6 95% 93%",
    accentForeground: "24.6 95% 23%",
    gradientStart: "#ea580c", // orange-600
    gradientMiddle: "#f97316", // orange-500
    gradientEnd: "#fb923c", // orange-400
    iconColor: "#f97316", // orange-500
    badgeColor: "#fb923c", // orange-400
  },
  pink: {
    primary: "330.4 81.2% 60.4%",
    primaryForeground: "0 0% 100%",
    accent: "330.4 81.2% 93%",
    accentForeground: "330.4 81.2% 30%",
    gradientStart: "#db2777", // pink-600
    gradientMiddle: "#ec4899", // pink-500
    gradientEnd: "#f472b6", // pink-400
    iconColor: "#ec4899", // pink-500
    badgeColor: "#f472b6", // pink-400
  },
  teal: {
    primary: "173.4 80.4% 40%",
    primaryForeground: "0 0% 100%",
    accent: "173.4 80.4% 90%",
    accentForeground: "173.4 80.4% 20%",
    gradientStart: "#0d9488", // teal-600
    gradientMiddle: "#14b8a6", // teal-500
    gradientEnd: "#2dd4bf", // teal-400
    iconColor: "#14b8a6", // teal-500
    badgeColor: "#2dd4bf", // teal-400
  },
  indigo: {
    primary: "239 84% 67%",
    primaryForeground: "0 0% 100%",
    accent: "239 84% 93%",
    accentForeground: "239 84% 37%",
    gradientStart: "#4f46e5", // indigo-600
    gradientMiddle: "#6366f1", // indigo-500
    gradientEnd: "#818cf8", // indigo-400
    iconColor: "#6366f1", // indigo-500
    badgeColor: "#818cf8", // indigo-400
  },
};

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = true,
}: ThemeProviderProps) {
  const { data: user } = trpc.auth.me.useQuery();
  
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [themeColor, setThemeColorState] = useState<ThemeColor>("blue");

  // Sincronizar tema com preferências do usuário
  useEffect(() => {
    if (user) {
      if (user.darkMode !== undefined) {
        const newTheme = user.darkMode ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      }
      if (user.themeColor) {
        setThemeColorState(user.themeColor as ThemeColor);
      }
    }
  }, [user?.darkMode, user?.themeColor]);

  // Aplicar tema dark/light
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  // Aplicar cor do tema dinamicamente (expandido para mais variáveis)
  useEffect(() => {
    const root = document.documentElement;
    const colors = COLOR_MAPPINGS[themeColor];
    
    // Aplicar cores primárias
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    
    // Aplicar cores de accent (botões, badges, links)
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-foreground", colors.accentForeground);
    
    // Aplicar gradiente completo do header
    root.style.setProperty("--header-gradient-start", colors.gradientStart);
    root.style.setProperty("--header-gradient-middle", colors.gradientMiddle);
    root.style.setProperty("--header-gradient-end", colors.gradientEnd);
    
    // Aplicar cores de ícones e badges
    root.style.setProperty("--icon-color", colors.iconColor);
    root.style.setProperty("--badge-color", colors.badgeColor);
  }, [themeColor]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColor, toggleTheme, setThemeColor, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
