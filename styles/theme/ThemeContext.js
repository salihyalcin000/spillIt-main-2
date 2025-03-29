import React, { createContext, useContext } from "react";
import { lightTheme } from "./index";

// Create theme context
const ThemeContext = createContext({
  theme: lightTheme,
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // We'll only use the light theme
  const theme = lightTheme;

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
