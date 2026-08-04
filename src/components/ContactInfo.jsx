// src/components/ContactInfo.jsx
import { Box, Typography, Paper, Stack, Link, Button, Divider } from '@mui/material';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

import Section from './Section';
import Reveal from './Reveal';
import { contact, socials, profile } from '../data/cv';

const SOCIAL_ICONS = { linkedin: LinkedInIcon, github: GitHubIcon };

const CHANNELS = [
  { id: 'email', Icon: MailRoundedIcon, label: 'Email', value: contact.email, href: contact.emailHref },
  { id: 'phone', Icon: CallRoundedIcon, label: 'Teléfono', value: contact.phone, href: contact.phoneHref },
  { id: 'place', Icon: PlaceRoundedIcon, label: 'Ubicación', value: contact.location },
];

export default function ContactInfo({ onDownload }) {
  return (
    <Section id="contacto" eyebrow="07 / Contacto" title="Hablemos">
      <Reveal>
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: (t) => t.palette.surface.accentBorder,
            bgcolor: (t) => t.palette.surface.accentSoft,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) auto minmax(0, 1fr)' },
              gap: { xs: 4, md: 5 },
              alignItems: 'center',
            }}
          >
            {/* Mensaje + CTA */}
            <Box>
              <Typography variant="h3" component="p" sx={{ color: 'text.primary', mb: 1.5 }}>
                ¿Tienes un proyecto o una vacante en mente?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                {profile.available
                  ? 'Estoy abierto a nuevas oportunidades y respondo en menos de 24 horas.'
                  : 'Escríbeme y te respondo lo antes posible.'}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  variant="contained"
                  href={contact.emailHref}
                  startIcon={<MailRoundedIcon />}
                  sx={{ px: 3 }}
                >
                  Escríbeme
                </Button>
                <Button
                  variant="outlined"
                  onClick={onDownload}
                  startIcon={<FileDownloadRoundedIcon />}
                  sx={{ px: 3, bgcolor: 'background.paper' }}
                >
                  Descargar CV
                </Button>
              </Stack>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: 'none', md: 'block' }, borderColor: (t) => t.palette.surface.accentBorder }}
            />

            {/* Canales */}
            <Box>
              <Stack spacing={2}>
                {CHANNELS.map(({ id, Icon, label, value, href }) => (
                  <Stack key={id} direction="row" spacing={1.75} alignItems="center">
                    <Box
                      aria-hidden
                      sx={{
                        flexShrink: 0,
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        color: 'primary.main',
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: (t) => t.palette.surface.accentBorder,
                      }}
                    >
                      <Icon sx={{ fontSize: 17 }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="overline" sx={{ color: 'text.disabled', display: 'block' }}>
                        {label}
                      </Typography>
                      {href ? (
                        <Link
                          href={href}
                          sx={{ fontSize: '0.92rem', color: 'text.primary', wordBreak: 'break-word' }}
                        >
                          {value}
                        </Link>
                      ) : (
                        <Typography sx={{ fontSize: '0.92rem', color: 'text.primary' }}>{value}</Typography>
                      )}
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                {socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.id];
                  return (
                    <Link
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label}: ${s.handle}`}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: '9px',
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: (t) => t.palette.surface.accentBorder,
                        color: 'text.secondary',
                        fontSize: '0.82rem',
                        transition: 'color .2s ease, transform .2s ease',
                        '&:hover': { color: 'primary.main', transform: 'translateY(-2px)' },
                      }}
                    >
                      <Icon sx={{ fontSize: 16 }} />
                      {s.label}
                    </Link>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Reveal>
    </Section>
  );
}
