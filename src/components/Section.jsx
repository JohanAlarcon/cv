// src/components/Section.jsx
import { Box, Typography, Stack } from '@mui/material';
import Reveal from './Reveal';

/** Estilo base de tarjeta: borde + superficie. Sin sombras pesadas. */
export const cardSx = (theme) => ({
  p: { xs: 2.5, md: 3.5 },
  borderRadius: 3,
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'divider',
  transition: 'border-color .25s ease, transform .25s ease, box-shadow .25s ease',
});

export const cardHoverSx = (theme) => ({
  '&:hover': {
    borderColor: theme.palette.surface.borderStrong,
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[3],
  },
});

/** Etiqueta monoespaciada sobre el título: ancla visual y ritmo de lectura. */
export function Eyebrow({ children, sx }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center" sx={sx}>
      <Box sx={{ width: 18, height: 1.5, bgcolor: 'primary.main', borderRadius: 1 }} />
      <Typography variant="overline" sx={{ color: 'primary.main' }}>
        {children}
      </Typography>
    </Stack>
  );
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Box sx={{ maxWidth: 720, mx: align === 'center' ? 'auto' : 0, textAlign: align }}>
      {eyebrow && (
        <Eyebrow sx={{ mb: 1.5, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          {eyebrow}
        </Eyebrow>
      )}
      <Typography variant="h2" component="h2" sx={{ color: 'text.primary' }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" sx={{ mt: 1.5, color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

/**
 * Contenedor de sección con ritmo vertical uniforme y `scroll-margin-top`
 * para que el nav fijo no tape el título al navegar por anclas.
 */
export default function Section({ id, eyebrow, title, description, align, children, sx }) {
  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      sx={{
        scrollMarginTop: { xs: '76px', md: '92px' },
        py: { xs: 6, md: 10 },
        ...sx,
      }}
    >
      {title && (
        <Reveal>
          <Box id={id ? `${id}-title` : undefined} sx={{ mb: { xs: 4, md: 6 } }}>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
              align={align}
            />
          </Box>
        </Reveal>
      )}
      {children}
    </Box>
  );
}
