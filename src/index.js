import React from 'react';
import ReactDOM from 'react-dom/client';        
import App from './App';
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);   
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>,
  </React.StrictMode>
);