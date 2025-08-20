import { useCallback } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { ThemeMode } from '../types/enums';

export function useTheme() {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  }, [mode, setMode]);

  return {
    mode: (mode as ThemeMode) || ThemeMode.LIGHT,
    toggleTheme
  };
}