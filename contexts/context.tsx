import React, { createContext, ReactNode, useContext, useState } from "react";

export type ThemeType = "light" | "dark";

export enum FilterType {
  All = "all",
  Exprired = "exprired",
  Done = "done",
}

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  danger: string;
}

const lightTheme: ThemeColors = {
  background: "#f5f5f5",
  surface: "#ffffff",
  primary: "#456882",
  text: "#333333",
  textSecondary: "#666666",
  border: "#e0e0e0",
  success: "#4CAF50",
  danger: "#FF4444",
};

const darkTheme: ThemeColors = {
  background: "#121212",
  surface: "#1e1e1e",
  primary: "#64b5f6",
  text: "#ffffff",
  textSecondary: "#b0b0b0",
  border: "#f7f7f7ff",
  success: "#66bb6a",
  danger: "#ef5350",
};

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeType>("light");
  const [filter, setFilter] = useState<FilterType>(FilterType.All);

  const colors = theme === "light" ? lightTheme : darkTheme;

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, colors, setTheme, toggleTheme, filter, setFilter }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
