import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ColorModeProvider from './ColorMode';
import reportWebVitals from './reportWebVitals';

// La hoja imprimible no comparte nada con el portafolio: se carga aparte para
// no engordar el bundle inicial de la web.
const CvDocument = lazy(() => import('./cv/CvDocument'));

// Enrutado mínimo sin dependencias: `?cv=1` sirve el documento imprimible.
// Un query param (y no una ruta) evita el 404 de GitHub Pages en SPAs.
const params = new URLSearchParams(window.location.search);
const isPrintView = params.get('cv') === '1';
const autoPrint = params.get('print') === '1';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ColorModeProvider forcedMode={isPrintView ? 'light' : undefined}>
      {isPrintView ? (
        <Suspense fallback={null}>
          <CvDocument autoPrint={autoPrint} />
        </Suspense>
      ) : (
        <App />
      )}
    </ColorModeProvider>
  </React.StrictMode>
);

reportWebVitals();
