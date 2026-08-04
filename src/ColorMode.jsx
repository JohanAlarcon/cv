// src/ColorMode.jsx
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { buildTheme } from './theme';

const STORAGE_KEY = 'cv-color-mode';

const ColorModeContext = createContext({ mode: 'light', toggle: () => {}, setMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

const readInitialMode = () => {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* localStorage bloqueado (modo privado): seguimos con la preferencia del SO */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * `forcedMode` permite que el documento imprimible se renderice siempre en claro,
 * sin tocar la preferencia guardada del usuario.
 */
export default function ColorModeProvider({ children, forcedMode }) {
  const [mode, setMode] = useState(readInitialMode);

  const activeMode = forcedMode ?? mode;

  useEffect(() => {
    if (forcedMode) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* no-op */
    }
    document.documentElement.style.colorScheme = mode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', mode === 'dark' ? '#0C0A09' : '#FAFAF9');
  }, [mode, forcedMode]);

  const toggle = useCallback(() => setMode((m) => (m === 'dark' ? 'light' : 'dark')), []);

  const theme = useMemo(() => buildTheme(activeMode), [activeMode]);
  const ctx = useMemo(() => ({ mode: activeMode, toggle, setMode }), [activeMode, toggle]);

  return (
    <ColorModeContext.Provider value={ctx}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
