import { render, screen } from '@testing-library/react';
import App from './App';
import ColorModeProvider from './ColorMode';
import { profile, sections } from './data/cv';

const renderApp = () =>
  render(
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  );

test('muestra el nombre como encabezado principal', () => {
  renderApp();
  expect(screen.getByRole('heading', { level: 1, name: profile.shortName })).toBeInTheDocument();
});

test('renderiza todas las secciones navegables', () => {
  const { container } = renderApp();
  sections.forEach((s) => {
    expect(container.querySelector(`#${s.id}`)).toBeInTheDocument();
  });
});
