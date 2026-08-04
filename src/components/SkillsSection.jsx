// src/components/SkillsSection.jsx
import { Box, Typography, Paper, Stack, Tooltip } from '@mui/material';
import {
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiNestjs,
  SiFilament,
  SiLivewire,
  SiReact,
  SiJavascript,
  SiVuedotjs,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiMui,
  SiMysql,
  SiGit,
  SiDocker,
  SiPostman,
} from 'react-icons/si';

import Section, { cardSx, cardHoverSx } from './Section';
import Reveal from './Reveal';
import { technicalSkills, softSkills } from '../data/cv';

const ICONS = {
  laravel: SiLaravel,
  php: SiPhp,
  node: SiNodedotjs,
  nest: SiNestjs,
  filament: SiFilament,
  livewire: SiLivewire,
  react: SiReact,
  javascript: SiJavascript,
  vue: SiVuedotjs,
  next: SiNextdotjs,
  html: SiHtml5,
  css: SiCss3,
  bootstrap: SiBootstrap,
  mui: SiMui,
  mysql: SiMysql,
  git: SiGit,
  docker: SiDocker,
  postman: SiPostman,
};

function SkillPill({ name, icon }) {
  const Icon = icon ? ICONS[icon] : null;

  return (
    <Stack
      direction="row"
      spacing={0.9}
      alignItems="center"
      sx={{
        px: 1.25,
        py: 0.7,
        borderRadius: '9px',
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: (t) => t.palette.surface.subtle,
        color: 'text.secondary',
        transition: 'color .2s ease, border-color .2s ease, background-color .2s ease, transform .2s ease',
        '&:hover': {
          color: 'primary.main',
          borderColor: (t) => t.palette.surface.accentBorder,
          bgcolor: (t) => t.palette.surface.accentSoft,
          transform: 'translateY(-2px)',
        },
      }}
    >
      {Icon && <Icon size={14} aria-hidden />}
      <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, lineHeight: 1.4, whiteSpace: 'nowrap' }}>
        {name}
      </Typography>
    </Stack>
  );
}

export default function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="04 / Competencias"
      title="Skills técnicas y blandas"
      description="Agrupadas por dominio para que se lean de un vistazo, no como una lista plana de etiquetas."
    >
      {/* ── Técnicas ─────────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 2,
        }}
      >
        {technicalSkills.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.06} style={{ height: '100%' }}>
            <Paper sx={[cardSx, cardHoverSx, { height: '100%' }]}>
              <Typography variant="overline" sx={{ color: 'text.disabled', display: 'block', mb: 2 }}>
                {group.label}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {group.items.map((item) => (
                  <SkillPill key={item.name} name={item.name} icon={item.icon} />
                ))}
              </Stack>
            </Paper>
          </Reveal>
        ))}
      </Box>

      {/* ── Blandas ──────────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: 'text.disabled', display: 'block', mb: 2 }}>
            Habilidades blandas
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 1.5,
            }}
          >
            {softSkills.map((s) => (
              <Tooltip key={s.name} title={s.detail} placement="top" arrow>
                <Box
                  tabIndex={0}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    cursor: 'default',
                    transition: 'border-color .2s ease, transform .2s ease',
                    '&:hover, &:focus-visible': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 500, color: 'text.primary' }}>
                    {s.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.25 }}>
                    {s.detail}
                  </Typography>
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
