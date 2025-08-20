import { createTheme } from '@mui/material/styles';

// Modern theme for Resource Explorer app with light and dark modes
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#2563eb',
          light: '#60a5fa',
          dark: '#1d4ed8',
          contrastText: '#ffffff'
        },
        secondary: {
          main: '#7c3aed',
          light: '#a78bfa',
          dark: '#5b21b6',
          contrastText: '#ffffff'
        },
        success: {
          main: '#059669',
          light: '#34d399',
          dark: '#047857',
          contrastText: '#ffffff'
        },
        warning: {
          main: '#d97706',
          light: '#fbbf24',
          dark: '#b45309',
          contrastText: '#ffffff'
        },
        error: {
          main: '#dc2626',
          light: '#f87171',
          dark: '#b91c1c',
          contrastText: '#ffffff'
        },
        info: {
          main: '#0891b2',
          light: '#22d3ee',
          dark: '#0e7490',
          contrastText: '#ffffff'
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          disabled: '#9ca3af'
        },
        background: {
          default: '#f9fafb',
          paper: '#ffffff'
        },
        grey: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        },
        divider: '#e5e7eb'
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
          contrastText: '#ffffff'
        },
        secondary: {
          main: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
          contrastText: '#ffffff'
        },
        success: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
          contrastText: '#ffffff'
        },
        warning: {
          main: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
          contrastText: '#000000'
        },
        error: {
          main: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
          contrastText: '#ffffff'
        },
        info: {
          main: '#06b6d4',
          light: '#22d3ee',
          dark: '#0891b2',
          contrastText: '#ffffff'
        },
        text: {
          primary: '#f9fafb',
          secondary: '#d1d5db',
          disabled: '#6b7280'
        },
        background: {
          default: '#111827',
          paper: '#1f2937'
        },
        grey: {
          50: '#111827',
          100: '#1f2937',
          200: '#374151',
          300: '#4b5563',
          400: '#6b7280',
          500: '#9ca3af',
          600: '#d1d5db',
          700: '#e5e7eb',
          800: '#f3f4f6',
          900: '#f9fafb'
        },
        divider: '#374151'
      }
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4
    }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  ]
});

export default theme;