// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5fa8f5',
      main: '#2980b9',
      dark: '#236895',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#5a6b7c',
      main: '#2c3e50',
      dark: '#1f2933',
      contrastText: '#ffffff',
    },
    accent: {
      light: '#f7dc71',
      main: '#f1c40f',
      dark: '#a57c0c',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#34495e',
      secondary: '#7f8c8d',
    },
  },

  typography: {
    fontFamily: 'Roboto, sans-serif',

    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '3rem',
      },
    },

    h2: {
      fontWeight: 500,
      fontSize: '1.4rem',
      '@media (min-width:600px)': {
        fontSize: '1.6rem',
      },
      '@media (min-width:960px)': {
        fontSize: '1.8rem',
      },
    },

    h3: {
      fontWeight: 500,
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '1.4rem',
      },
      '@media (min-width:960px)': {
        fontSize: '1.6rem',
      },
    },

    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.5,
    },

    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 8,
  },

  spacing: 8, // 1 unidad = 8px

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
      `,
    },

    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
      styleOverrides: {
        root: {
          padding: '1.5rem',
          marginBottom: '1.5rem',
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
          borderRadius: 6,
          boxShadow: 'none',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          '&:hover': {
            backgroundColor: '#256f9a',
            transform: 'translateY(-2px)',
          },
        },
      },
    },

    MuiLink: {
      defaultProps: {
        underline: 'hover',
        color: 'primary',
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '32px',
          color: '#2980b9',
        },
      },
    },
  },
});

export default theme;