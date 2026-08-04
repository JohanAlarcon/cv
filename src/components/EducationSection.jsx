// src/components/EducationSection.jsx
import { Box, Typography, Paper, Stack } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Section, { cardSx, cardHoverSx } from './Section';
import Reveal from './Reveal';
import { education } from '../data/cv';

export default function EducationSection() {
  return (
    <Section id="educacion" eyebrow="03 / Formación" title="Educación">
      <Box sx={{ display: 'grid', gap: 2 }}>
        {education.map((item, idx) => (
          <Reveal key={item.id} delay={idx * 0.06}>
            <Paper sx={[cardSx, cardHoverSx]}>
              <Stack direction="row" spacing={2.5} alignItems="flex-start">
                <Box
                  aria-hidden
                  sx={{
                    flexShrink: 0,
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'primary.main',
                    bgcolor: (t) => t.palette.surface.accentSoft,
                    border: '1px solid',
                    borderColor: (t) => t.palette.surface.accentBorder,
                  }}
                >
                  <SchoolRoundedIcon sx={{ fontSize: 20 }} />
                </Box>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'baseline' }}
                    spacing={0.5}
                  >
                    <Typography variant="h3" component="h3" sx={{ color: 'text.primary' }}>
                      {item.degree}
                    </Typography>
                    <Typography
                      component="time"
                      sx={{
                        fontFamily: (t) => t.typography.overline.fontFamily,
                        fontSize: '0.76rem',
                        letterSpacing: '0.04em',
                        color: 'text.secondary',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.period}
                    </Typography>
                  </Stack>

                  <Typography sx={{ mt: 0.4, fontSize: '0.95rem', fontWeight: 500, color: 'primary.main' }}>
                    {item.institution}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.25 }}>
                    {item.location}
                  </Typography>

                  {item.highlights?.map((h) => (
                    <Typography key={h} variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
                      {h}
                    </Typography>
                  ))}
                </Box>
              </Stack>
            </Paper>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
