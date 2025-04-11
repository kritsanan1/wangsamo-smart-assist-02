
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { currentTheme, darkMode } = useTheme();

  const applyThemeClasses = () => {
    // Create class names based on the current theme
    return cn(
      `font-${currentTheme.fontFamily}`,
      {
        "theme-primary-color": true,
        "theme-secondary-color": true,
        "theme-accent-color": true,
        "theme-border-radius": true,
      }
    );
  };

  // Define CSS variables to be applied to the :root element
  const themeStyle = {
    "--theme-primary-color": `var(--${currentTheme.primaryColor})`,
    "--theme-secondary-color": `var(--${currentTheme.secondaryColor})`,
    "--theme-accent-color": `var(--${currentTheme.accentColor})`,
    "--theme-border-radius": currentTheme.borderRadius,
  } as React.CSSProperties;

  return (
    <div className={applyThemeClasses()} style={themeStyle}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
