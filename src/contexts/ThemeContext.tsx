
import React, { createContext, useContext, useState, useEffect } from "react";

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

// Available colors for the color picker
export const colorOptions = [
  { name: "วังสามหมอส้ม", value: "wangsammo-orange" },
  { name: "วังสามหมอฟ้า", value: "wangsammo-blue" },
  { name: "วังสามหมอเขียว", value: "wangsammo-teal" },
  { name: "น้ำเงินเข้ม", value: "indigo-600" },
  { name: "เขียวมรกต", value: "emerald-500" },
  { name: "ม่วงอ่อน", value: "violet-500" },
  { name: "แดงกุหลาบ", value: "rose-500" },
  { name: "ส้มอำพัน", value: "amber-500" },
  { name: "น้ำเงินฟ้า", value: "blue-500" },
  { name: "เทา", value: "slate-600" },
];

interface ThemeContextType {
  currentTheme: Theme;
  themeName: string;
  setThemeName: (name: string) => void;
  customTheme: Theme;
  updateCustomTheme: (theme: Partial<Theme>) => void;
  applyCustomTheme: () => void;
  // New properties for dark mode
  darkMode: boolean;
  toggleDarkMode: () => void;
  // New property for primary color
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Fix the ThemeProvider component definition - make sure it's a proper React function component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState("default");
  const [customTheme, setCustomTheme] = useState<Theme>(themes.default);
  // Add dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Check if dark mode is stored in local storage on initial load
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === "true");
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Set primary color function
  const setPrimaryColor = (color: string) => {
    updateCustomTheme({ primaryColor: color });
    setThemeName("custom");
  };

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
        applyCustomTheme,
        darkMode,
        toggleDarkMode,
        setPrimaryColor
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
