// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#818cf8',
      main: '#4f46e5', // Indigo 600
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#9ca3af',
      main: '#4b5563', // Gray 600
      dark: '#1f2937',
      contrastText: '#ffffff',
    },
    accent: {
      light: '#67e8f9',
      main: '#06b6d4', // Cyan 500
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Slate 50
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#64748b', // Slate 500
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:960px)': {
        fontSize: '3.5rem',
      },
      letterSpacing: '-0.02em',
    },

    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:960px)': {
        fontSize: '2.25rem',
      },
      letterSpacing: '-0.01em',
    },

    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '1.75rem',
      },
    },

    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 500,
    },

    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#334155', // Slate 700
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#475569', // Slate 600
    },

    button: {
      fontFamily: '"Inter", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },

  shape: {
    borderRadius: 12, // Soft UI corners
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
        }
      `,
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          padding: '1.5rem',
          marginBottom: '1.5rem',
          borderRadius: '16px',
          border: '1px solid #e2e8f0', // Slate 200 soft border
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)', // Soft shadow
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },

    MuiLink: {
      defaultProps: {
        underline: 'hover',
        color: 'primary.main',
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: 'color 0.2s ease',
        }
      }
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '36px',
          color: '#4f46e5', // Indigo 600
        },
      },
    },
    
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        }
      }
    }
  },
});

export default theme;