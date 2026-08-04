// src/components/Hero.jsx
import { Box, Typography, Button, Stack, Chip, Link, Divider } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import { profile, contact, socials, metrics } from '../data/cv';

const EASE = [0.22, 1, 0.36, 1];

const SOCIAL_ICONS = { linkedin: LinkedInIcon, github: GitHubIcon };

export default function Hero({ onDownload, onPrintable }) {
  const reduce = useReducedMotion();

  const enter = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <Box
      component="header"
      id="inicio"
      sx={{
        position: 'relative',
        pt: { xs: 12, md: 17 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.35fr) minmax(0, 1fr)' },
          gap: { xs: 5, md: 8 },
          alignItems: 'center',
        }}
      >
        {/* ── Columna de texto ─────────────────────────────────────── */}
        <Box>
          {profile.available && (
            <Box component={motion.div} {...enter(0)}>
              <Chip
                size="small"
                label={profile.availabilityLabel}
                icon={
                  <Box
                    component="span"
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      ml: '10px !important',
                      boxShadow: (t) => `0 0 0 3px ${t.palette.success.main}25`,
                    }}
                  />
                }
                sx={{
                  mb: 3,
                  px: 0.5,
                  height: 30,
                  fontWeight: 500,
                  color: 'text.secondary',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
            </Box>
          )}

          <Typography
            component={motion.h1}
            variant="h1"
            {...enter(0.06)}
            sx={{ color: 'text.primary', mb: 1.5 }}
          >
            {profile.shortName}
          </Typography>

          <Box component={motion.div} {...enter(0.12)}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              flexWrap="wrap"
              useFlexGap
              sx={{ mb: 3 }}
            >
              <Typography
                sx={{
                  fontFamily: (t) => t.typography.h1.fontFamily,
                  fontSize: { xs: '1.05rem', md: '1.25rem' },
                  fontWeight: 500,
                  color: 'primary.main',
                }}
              >
                {profile.role}
              </Typography>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }} />
              <Typography
                sx={{
                  fontFamily: (t) => t.typography.overline.fontFamily,
                  fontSize: { xs: '0.8rem', md: '0.86rem' },
                  color: 'text.secondary',
                  letterSpacing: '0.01em',
                }}
              >
                {profile.headline}
              </Typography>
            </Stack>
          </Box>

          <Typography
            component={motion.p}
            variant="body1"
            {...enter(0.18)}
            sx={{ color: 'text.secondary', maxWidth: 560, mb: 4 }}
          >
            {profile.tagline}
          </Typography>

          <Stack
            component={motion.div}
            {...enter(0.24)}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onDownload}
              startIcon={<FileDownloadRoundedIcon />}
              sx={{ px: 3 }}
            >
              Descargar CV
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={onPrintable}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ px: 3 }}
            >
              Ver versión imprimible
            </Button>
          </Stack>

          {/* Datos de contacto directos: el reclutador no debería tener que buscarlos. */}
          <Stack
            component={motion.div}
            {...enter(0.3)}
            direction="row"
            spacing={{ xs: 1.5, sm: 2.5 }}
            flexWrap="wrap"
            useFlexGap
            alignItems="center"
            divider={
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
            }
          >
            <MetaItem icon={PlaceRoundedIcon} text={contact.location} />
            <MetaItem icon={MailRoundedIcon} text={contact.email} href={contact.emailHref} />
            <MetaItem icon={CallRoundedIcon} text={contact.phone} href={contact.phoneHref} />
            <Stack direction="row" spacing={0.5}>
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.id];
                return (
                  <Link
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    sx={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 30,
                      height: 30,
                      borderRadius: '9px',
                      color: 'text.secondary',
                      transition: 'color .2s ease, background-color .2s ease',
                      '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </Link>
                );
              })}
            </Stack>
          </Stack>
        </Box>

        {/* ── Retrato ──────────────────────────────────────────────── */}
        <Box
          component={motion.div}
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7, delay: 0.15, ease: EASE },
              })}
          sx={{
            position: 'relative',
            justifySelf: { xs: 'center', md: 'end' },
            width: { xs: 200, sm: 240, md: '100%' },
            maxWidth: 320,
          }}
        >
          {/* Marco desplazado: profundidad sin sombras ni gradientes. */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              transform: 'translate(14px, 14px)',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 4,
              opacity: 0.4,
            }}
          />
          <Box
            component="img"
            src={profile.photo}
            alt={`Retrato de ${profile.name}`}
            width={320}
            height={384}
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '5 / 6',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: 4,
              display: 'block',
              border: '1px solid',
              borderColor: 'divider',
              filter: (t) => (t.palette.mode === 'dark' ? 'brightness(0.92)' : 'none'),
            }}
          />
        </Box>
      </Box>

      {/* ── Métricas ─────────────────────────────────────────────── */}
      <Box
        component={motion.div}
        {...enter(0.36)}
        sx={{
          mt: { xs: 6, md: 9 },
          pt: { xs: 3, md: 4 },
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 3, md: 2 },
        }}
      >
        {metrics.map((m) => (
          <Box key={m.label}>
            <Typography
              sx={{
                fontFamily: (t) => t.typography.h1.fontFamily,
                fontSize: { xs: '1.75rem', md: '2.1rem' },
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: 'text.primary',
              }}
            >
              {m.value}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.75 }}>
              {m.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function MetaItem({ icon: Icon, text, href }) {
  const content = (
    <Stack direction="row" spacing={0.75} alignItems="center">
      <Icon sx={{ fontSize: 15, color: 'primary.main' }} />
      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
        {text}
      </Typography>
    </Stack>
  );

  if (!href) return content;

  return (
    <Link href={href} sx={{ '&:hover .MuiTypography-root': { color: 'primary.main' } }}>
      {content}
    </Link>
  );
}
