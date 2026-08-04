// src/theme.js
import { createTheme, alpha } from '@mui/material/styles';

// ─── Tipografía ──────────────────────────────────────────────────────────────
// Display: Space Grotesk  → carácter técnico, geométrico, poco habitual en CVs.
// Texto:   Inter          → máxima legibilidad en pantalla y en cuerpos pequeños.
// Mono:    JetBrains Mono → metadatos (fechas, etiquetas, eyebrows).
export const FONT_DISPLAY = '"Space Grotesk", "Outfit", ui-sans-serif, system-ui, sans-serif';
export const FONT_SANS =
  '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
export const FONT_MONO =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Courier New", monospace';

// ─── Paleta ──────────────────────────────────────────────────────────────────
// Neutros cálidos (stone) + un único acento verde azulado.
// Un solo acento mantiene la lectura sobria; el color se reserva para lo que
// debe destacar (enlaces, CTA, marcadores de sección).
const TOKENS = {
  light: {
    accent: '#0F766E',
    accentStrong: '#115E59',
    accentSoft: '#F0FDFA',
    accentBorder: '#99F6E4',
    bg: '#FAFAF9',
    paper: '#FFFFFF',
    subtle: '#F5F5F4',
    border: '#E7E5E4',
    borderStrong: '#D6D3D1',
    text: '#1C1917',
    textDim: '#57534E',
    textFaint: '#8A8580',
  },
  dark: {
    accent: '#2DD4BF',
    accentStrong: '#5EEAD4',
    accentSoft: 'rgba(45, 212, 191, 0.10)',
    accentBorder: 'rgba(45, 212, 191, 0.28)',
    bg: '#0C0A09',
    paper: '#141210',
    subtle: '#1C1917',
    border: '#292524',
    borderStrong: '#3A3532',
    text: '#FAFAF9',
    textDim: '#A8A29E',
    textFaint: '#78716C',
  },
};

export const getTokens = (mode) => TOKENS[mode] ?? TOKENS.light;

// Escala fluida: evita media queries por cada tamaño de fuente.
const fluid = (min, max, minVw = 20, maxVw = 90) =>
  `clamp(${min}rem, calc(${min}rem + (${max} - ${min}) * ((100vw - ${minVw}rem) / (${maxVw} - ${minVw}))), ${max}rem)`;

export function buildTheme(mode = 'light') {
  const t = getTokens(mode);
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: t.accent,
        light: isDark ? '#5EEAD4' : '#14B8A6',
        dark: t.accentStrong,
        contrastText: isDark ? '#04211E' : '#FFFFFF',
      },
      secondary: {
        main: isDark ? '#E7E5E4' : '#1C1917',
        light: isDark ? '#FAFAF9' : '#44403C',
        dark: isDark ? '#A8A29E' : '#0C0A09',
        contrastText: isDark ? '#0C0A09' : '#FFFFFF',
      },
      success: { main: isDark ? '#4ADE80' : '#16A34A' },
      background: { default: t.bg, paper: t.paper },
      text: { primary: t.text, secondary: t.textDim, disabled: t.textFaint },
      divider: t.border,
      // Tokens propios — se consumen vía theme.palette.surface.*, nunca como color="surface".
      surface: {
        subtle: t.subtle,
        border: t.border,
        borderStrong: t.borderStrong,
        accentSoft: t.accentSoft,
        accentBorder: t.accentBorder,
        faint: t.textFaint,
      },
    },

    shape: { borderRadius: 12 },
    spacing: 8,

    typography: {
      fontFamily: FONT_SANS,
      h1: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        fontSize: fluid(2.25, 4),
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
      },
      h2: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        fontSize: fluid(1.6, 2.35),
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        fontSize: fluid(1.1, 1.35),
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 600,
        fontSize: '1.05rem',
        lineHeight: 1.3,
      },
      subtitle1: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
      subtitle2: { fontWeight: 500, fontSize: '0.9rem', lineHeight: 1.5 },
      body1: { fontSize: '1rem', lineHeight: 1.7, letterSpacing: '-0.005em' },
      body2: { fontSize: '0.9rem', lineHeight: 1.65, letterSpacing: '-0.003em' },
      caption: { fontSize: '0.78rem', lineHeight: 1.5 },
      overline: {
        fontFamily: FONT_MONO,
        fontSize: '0.7rem',
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
      },
      button: { fontFamily: FONT_SANS, textTransform: 'none', fontWeight: 500, letterSpacing: 0 },
    },

    // Sombras casi planas: la jerarquía la da el borde y el espacio, no el drop shadow.
    shadows: [
      'none',
      `0 1px 2px ${alpha('#0C0A09', isDark ? 0.5 : 0.04)}`,
      `0 2px 8px ${alpha('#0C0A09', isDark ? 0.55 : 0.05)}`,
      `0 8px 24px -8px ${alpha('#0C0A09', isDark ? 0.7 : 0.10)}`,
      `0 16px 40px -12px ${alpha('#0C0A09', isDark ? 0.75 : 0.14)}`,
      ...Array(20).fill(`0 24px 56px -16px ${alpha('#0C0A09', isDark ? 0.8 : 0.18)}`),
    ],

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth', WebkitFontSmoothing: 'antialiased' },
          body: { backgroundColor: t.bg, color: t.text },
          '::selection': { background: alpha(t.accent, 0.22) },
          '*:focus-visible': {
            outline: `2px solid ${t.accent}`,
            outlineOffset: '3px',
            borderRadius: '6px',
          },
          '@media (prefers-reduced-motion: reduce)': {
            html: { scrollBehavior: 'auto' },
            '*': {
              animationDuration: '0.01ms !important',
              transitionDuration: '0.01ms !important',
            },
          },
        },
      },

      // Sin padding por defecto: Paper también lo usan menús, tooltips y diálogos.
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { backgroundImage: 'none' },
          outlined: { borderColor: t.border },
        },
      },

      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 18px',
            transition: 'background-color .2s ease, border-color .2s ease, color .2s ease, transform .2s ease',
          },
          containedPrimary: {
            '&:hover': { backgroundColor: t.accentStrong },
          },
          outlined: {
            borderColor: t.borderStrong,
            color: t.text,
            '&:hover': { borderColor: t.accent, color: t.accent, backgroundColor: t.accentSoft },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 500, fontSize: '0.78rem' },
          outlined: { borderColor: t.border },
        },
      },

      MuiLink: {
        defaultProps: { underline: 'none' },
        styleOverrides: {
          root: {
            fontWeight: 500,
            transition: 'color .18s ease',
            '&:hover': { color: t.accent },
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: { transition: 'color .18s ease, border-color .18s ease, background-color .18s ease' },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? '#292524' : '#1C1917',
            fontSize: '0.75rem',
            borderRadius: 8,
            padding: '6px 10px',
          },
        },
      },

      MuiDivider: { styleOverrides: { root: { borderColor: t.border } } },
    },
  });
}

export default buildTheme('light');
