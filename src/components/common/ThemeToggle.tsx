import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="Toggle theme"
        sx={{
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};