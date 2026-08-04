// src/components/ExperienceTimeline.jsx
import { Box, Typography, Paper, Chip, Stack } from '@mui/material';
import Section, { cardSx, cardHoverSx } from './Section';
import Reveal from './Reveal';
import { experience, yearsOfExperience } from '../data/cv';

/**
 * Timeline de una sola columna. La versión alternante obliga a la mirada a
 * zigzaguear; en un CV que se escanea en segundos, una sola columna gana.
 */
export default function ExperienceTimeline() {
  return (
    <Section
      id="experiencia"
      eyebrow="02 / Trayectoria"
      title="Experiencia profesional"
      description={`${yearsOfExperience} años construyendo y manteniendo software en producción, en el sector público y en el privado.`}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          gap: { xs: 3, md: 4 },
          pl: { xs: 3.5, sm: 4.5 },
          // Rail continuo detrás de los marcadores.
          '&::before': {
            content: '""',
            position: 'absolute',
            left: { xs: 7, sm: 11 },
            top: 8,
            bottom: 8,
            width: '1px',
            bgcolor: 'divider',
          },
        }}
      >
        {experience.map((job, idx) => (
          <Reveal key={job.id} delay={idx * 0.08}>
            <Box sx={{ position: 'relative' }}>
              {/* Marcador */}
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  left: { xs: -28, sm: -36 },
                  top: 26,
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  bgcolor: 'background.default',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  display: 'grid',
                  placeItems: 'center',
                  '&::after': {
                    content: '""',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  },
                }}
              />

              <Paper sx={[cardSx, cardHoverSx]}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'baseline' }}
                  spacing={0.5}
                  sx={{ mb: 1.5 }}
                >
                  <Box>
                    <Typography variant="h3" component="h3" sx={{ color: 'text.primary' }}>
                      {job.role}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.4,
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: 'primary.main',
                      }}
                    >
                      {job.company}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
                    {job.current && (
                      <Box
                        aria-hidden
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          bgcolor: 'success.main',
                          boxShadow: (t) => `0 0 0 3px ${t.palette.success.main}25`,
                        }}
                      />
                    )}
                    <Typography
                      component="time"
                      sx={{
                        fontFamily: (t) => t.typography.overline.fontFamily,
                        fontSize: '0.76rem',
                        letterSpacing: '0.04em',
                        color: job.current ? 'text.primary' : 'text.secondary',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {job.period}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 2 }}>
                  {job.context} · {job.location}
                </Typography>

                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1 }}>
                  {job.highlights.map((h) => (
                    <Box
                      component="li"
                      key={h}
                      sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}
                    >
                      <Box
                        aria-hidden
                        sx={{
                          mt: '9px',
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          flexShrink: 0,
                          bgcolor: 'primary.main',
                          opacity: 0.6,
                        }}
                      />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {h}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 2.5 }}>
                  {job.stack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 24,
                        fontFamily: (t) => t.typography.overline.fontFamily,
                        fontSize: '0.68rem',
                        letterSpacing: '0.03em',
                        color: 'text.secondary',
                        bgcolor: (t) => t.palette.surface.subtle,
                      }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
