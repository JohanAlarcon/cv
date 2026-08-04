// src/components/AchievementsSection.jsx
import { Box, Typography, Paper, Stack } from '@mui/material';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import Section, { cardSx, cardHoverSx } from './Section';
import Reveal from './Reveal';
import { achievements } from '../data/cv';

export default function AchievementsSection() {
  return (
    <Section id="logros" eyebrow="06 / Impacto" title="Logros">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 2,
        }}
      >
        {achievements.map((item, idx) => (
          <Reveal key={item.title} delay={idx * 0.08} style={{ height: '100%' }}>
            <Paper sx={[cardSx, cardHoverSx, { height: '100%' }]}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  aria-hidden
                  sx={{
                    flexShrink: 0,
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'primary.main',
                    bgcolor: (t) => t.palette.surface.accentSoft,
                    border: '1px solid',
                    borderColor: (t) => t.palette.surface.accentBorder,
                  }}
                >
                  <EmojiEventsRoundedIcon sx={{ fontSize: 19 }} />
                </Box>

                <Box>
                  <Typography variant="h4" component="h3" sx={{ fontSize: '1rem', color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.75 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
