import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'blue', toggleTheme: () => {} });

const THEME_KEY = 'appTheme';

export function getInitialTheme() {
  return localStorage.getItem(THEME_KEY) === 'purple' ? 'purple' : 'blue';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'purple' ? 'blue' : 'purple'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
