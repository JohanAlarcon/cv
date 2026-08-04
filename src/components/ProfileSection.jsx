// src/components/ProfileSection.jsx
import { Box, Typography, Paper, Stack } from '@mui/material';
import Section, { cardSx, cardHoverSx } from './Section';
import Reveal from './Reveal';
import { profile, focusAreas, languages } from '../data/cv';

export default function ProfileSection() {
  return (
    <Section
      id="perfil"
      eyebrow="01 / Perfil"
      title="Ingeniería de software con foco en el resultado"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.1fr) minmax(0, 1fr)' },
          gap: { xs: 4, md: 7 },
          alignItems: 'start',
        }}
      >
        {/* Resumen */}
        <Reveal>
          <Typography
            sx={{
              fontSize: { xs: '1.02rem', md: '1.12rem' },
              lineHeight: 1.75,
              color: 'text.primary',
              // Primera línea destacada: guía la mirada en los primeros segundos.
              '& strong': { fontWeight: 600 },
            }}
          >
            {profile.summary}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 3 }} flexWrap="wrap" useFlexGap>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              Idiomas
            </Typography>
            {languages.map((l) => (
              <Typography key={l.name} variant="body2" sx={{ color: 'text.secondary' }}>
                {l.name} — {l.level}
              </Typography>
            ))}
          </Stack>
        </Reveal>

        {/* Ejes de trabajo */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          {focusAreas.map((area, i) => (
            <Reveal key={area.id} delay={i * 0.06} style={{ height: '100%' }}>
              <Paper
                sx={[cardSx, cardHoverSx, { p: 2.5, height: '100%' }]}
                aria-label={area.title}
              >
                <Typography
                  variant="h4"
                  sx={{ fontSize: '0.98rem', mb: 0.75, color: 'text.primary' }}
                >
                  {area.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {area.description}
                </Typography>
              </Paper>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}
