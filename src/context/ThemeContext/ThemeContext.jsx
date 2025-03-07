import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme, violetTheme } from "../../components/styles/GlobalStyles";

export const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const [theme, setTheme] = useState(darkTheme);

  const switchTheme = (themeName) => {
    const themes = { light: lightTheme, dark: darkTheme, violet: violetTheme };
    setTheme(themes[themeName] || lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

