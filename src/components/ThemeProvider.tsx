import React from 'react';
import { CssVarsProvider } from '@mui/material/styles';
import theme from '../theme/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <CssVarsProvider 
      theme={theme} 
      defaultMode="light"
      modeStorageKey="resource-explorer-theme"
    >
      {children}
    </CssVarsProvider>
  );
};