// src/components/Nav.jsx
import { useEffect, useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Tooltip,
  useScrollTrigger,
} from '@mui/material';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

import { sections, profile } from '../data/cv';
import { useColorMode } from '../ColorMode';

/** Barra de progreso de lectura: microinteracción discreta, cero coste de layout. */
function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  if (reduce) return null;

  return (
    <Box
      component={motion.div}
      aria-hidden
      style={{ scaleX }}
      sx={{
        transformOrigin: '0% 50%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        bgcolor: 'primary.main',
      }}
    />
  );
}

export default function Nav({ onDownload }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(sections[0].id);
  const { mode, toggle } = useColorMode();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 });

  // Sección activa por observación del viewport (más fiable que escuchar scroll).
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    if (!targets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const go = useCallback((id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={{
          backdropFilter: 'saturate(180%) blur(14px)',
          WebkitBackdropFilter: 'saturate(180%) blur(14px)',
          bgcolor: (t) =>
            t.palette.mode === 'dark' ? 'rgba(12,10,9,0.72)' : 'rgba(250,250,249,0.78)',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'divider' : 'transparent',
          transition: 'border-color .3s ease',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 72 }, gap: 2 }}>
            {/* Monograma / marca */}
            <Box
              component="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Ir al inicio"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                background: 'none',
                border: 0,
                p: 0,
                cursor: 'pointer',
                color: 'text.primary',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '9px',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontFamily: (t) => t.typography.h1.fontFamily,
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {profile.initials}
              </Box>
              <Typography
                sx={{
                  fontFamily: (t) => t.typography.h1.fontFamily,
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  letterSpacing: '-0.02em',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {profile.shortName}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Navegación desktop */}
            <Stack
              direction="row"
              spacing={0.5}
              component="nav"
              aria-label="Secciones"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <Button
                    key={s.id}
                    onClick={() => go(s.id)}
                    aria-current={isActive ? 'true' : undefined}
                    sx={{
                      px: 1.5,
                      py: 0.75,
                      minWidth: 0,
                      fontSize: '0.86rem',
                      color: isActive ? 'text.primary' : 'text.secondary',
                      position: 'relative',
                      '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 12,
                        right: 12,
                        bottom: 4,
                        height: '2px',
                        borderRadius: 1,
                        bgcolor: 'primary.main',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'center',
                        transition: 'transform .28s cubic-bezier(.22,1,.36,1)',
                      },
                    }}
                  >
                    {s.label}
                  </Button>
                );
              })}
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: { md: 1.5 } }}>
              <Tooltip title={mode === 'dark' ? 'Tema claro' : 'Tema oscuro'}>
                <IconButton
                  onClick={toggle}
                  aria-label={mode === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
                  size="small"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '10px',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                  }}
                >
                  {mode === 'dark' ? (
                    <LightModeRoundedIcon fontSize="small" />
                  ) : (
                    <DarkModeRoundedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                size="small"
                onClick={onDownload}
                startIcon={<FileDownloadRoundedIcon />}
                sx={{ display: { xs: 'none', sm: 'inline-flex' }, py: 0.9 }}
              >
                Descargar CV
              </Button>

              <IconButton
                onClick={() => setOpen(true)}
                aria-label="Abrir menú"
                size="small"
                sx={{
                  display: { xs: 'inline-flex', md: 'none' },
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '10px',
                  color: 'text.secondary',
                }}
              >
                <MenuRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
        <ScrollProgress />
      </AppBar>

      {/* Navegación móvil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: 'background.default', backgroundImage: 'none' } }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Navegación
          </Typography>
          <IconButton onClick={() => setOpen(false)} aria-label="Cerrar menú" size="small">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>

        <List sx={{ px: 1 }}>
          {sections.map((s) => (
            <ListItemButton
              key={s.id}
              onClick={() => go(s.id)}
              selected={active === s.id}
              sx={{ borderRadius: 2, mb: 0.25 }}
            >
              <ListItemText
                primary={s.label}
                primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: active === s.id ? 600 : 400 }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ p: 2, mt: 'auto' }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FileDownloadRoundedIcon />}
            onClick={() => {
              setOpen(false);
              onDownload?.();
            }}
          >
            Descargar CV
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
