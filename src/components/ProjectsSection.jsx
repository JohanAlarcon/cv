// src/components/ProjectsSection.jsx
import { Box, Typography, Paper, Chip, Stack, Link } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import Section, { cardSx } from './Section';
import Reveal from './Reveal';
import { projects } from '../data/cv';

export default function ProjectsSection() {
  return (
    <Section
      id="proyectos"
      eyebrow="05 / Portafolio"
      title="Proyectos destacados"
      description="Sistemas en producción, con usuarios reales, en entornos públicos y privados."
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: { xs: 2.5, md: 3 },
        }}
      >
        {projects.map((project, idx) => (
          <Reveal key={project.id} delay={idx * 0.08} style={{ height: '100%' }}>
            <Paper
              component="article"
              sx={[
                cardSx,
                {
                  p: 0,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: (t) => t.palette.surface.borderStrong,
                    transform: 'translateY(-4px)',
                    boxShadow: (t) => t.shadows[3],
                  },
                  '&:hover .project-media': { transform: 'scale(1.04)' },
                  '&:hover .project-arrow': { transform: 'translate(2px, -2px)' },
                },
              ]}
            >
              {/* Media */}
              <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: (t) => t.palette.surface.subtle }}>
                <Box
                  className="project-media"
                  component="img"
                  src={project.image}
                  alt={`Captura de ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '16 / 10',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    transition: 'transform .5s cubic-bezier(.22,1,.36,1)',
                  }}
                />
                <Chip
                  label={project.sector}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    height: 24,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: 'text.primary',
                    bgcolor: (t) =>
                      t.palette.mode === 'dark' ? 'rgba(20,18,16,0.85)' : 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
              </Box>

              {/* Contenido */}
              <Box sx={{ p: 2.75, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Typography variant="h3" component="h3" sx={{ fontSize: '1.12rem', color: 'text.primary' }}>
                  {project.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.4 }}>
                  {project.subtitle}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.75, flexGrow: 1 }}>
                  {project.description}
                </Typography>

                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 2.5 }}>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
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

                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      mt: 2.5,
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.75,
                      fontSize: '0.85rem',
                      color: 'primary.main',
                    }}
                  >
                    {project.linkLabel}
                    <ArrowOutwardRoundedIcon
                      className="project-arrow"
                      sx={{ fontSize: 15, transition: 'transform .25s ease' }}
                    />
                  </Link>
                )}
              </Box>
            </Paper>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
