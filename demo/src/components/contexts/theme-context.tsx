"use client";

import { createContext, useContext, useEffect, useState } from "react";

const THEMES = ["light", "dark", "auto"] as const;
type TTheme = (typeof THEMES)[number];

type ThemeContextType = {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

type ThemeProviderProps = {
  children: React.ReactNode | ((theme: TTheme) => React.ReactNode);
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<TTheme>("light");

  // check and set theme if user has set theme in local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as TTheme;
    if (savedTheme && THEMES.includes(savedTheme)) {
      updateTheme(savedTheme);
    }
  }, []);

  const updateTheme = (theme: TTheme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);

    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const value = {
    theme,
    setTheme: updateTheme,
  };

  const childrenToRender =
    typeof children === "function" ? children(theme) : children;

  return (
    <ThemeContext.Provider value={value}>
      {childrenToRender}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
