
import React, { createContext, useContext, useState } from "react";

// Define the theme type
interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
}

// Define default themes
const themes = {
  default: {
    primaryColor: "wangsammo-orange",  // Using existing theme colors
    secondaryColor: "wangsammo-teal",
    accentColor: "wangsammo-blue",
    fontFamily: "Sarabun",
    borderRadius: "rounded-md",
  },
  minimal: {
    primaryColor: "slate-600",
    secondaryColor: "slate-400",
    accentColor: "blue-500",
    fontFamily: "sans",
    borderRadius: "rounded-sm",
  },
  vibrant: {
    primaryColor: "rose-500",
    secondaryColor: "violet-500",
    accentColor: "amber-500",
    fontFamily: "Sarabun",
    borderRadius: "rounded-xl",
  },
  professional: {
    primaryColor: "indigo-600",
    secondaryColor: "gray-700",
    accentColor: "emerald-500",
    fontFamily: "serif",
    borderRadius: "rounded-lg",
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  themeName: string;
  setThemeName: (name: string) => void;
  customTheme: Theme;
  updateCustomTheme: (theme: Partial<Theme>) => void;
  applyCustomTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Fix the ThemeProvider component definition - make sure it's a proper React function component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState("default");
  const [customTheme, setCustomTheme] = useState<Theme>(themes.default);

  // Get the current theme object based on theme name
  const currentTheme = themeName === "custom" ? customTheme : themes[themeName as keyof typeof themes];

  // Update a specific property in the custom theme
  const updateCustomTheme = (theme: Partial<Theme>) => {
    setCustomTheme(prevTheme => ({
      ...prevTheme,
      ...theme
    }));
  };

  // Apply the custom theme
  const applyCustomTheme = () => {
    setThemeName("custom");
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeName,
        setThemeName,
        customTheme,
        updateCustomTheme,
        applyCustomTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
