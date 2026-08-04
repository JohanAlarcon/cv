import { useCallback, useEffect } from 'react';
import { Box, Container, Link } from '@mui/material';

import Nav from './components/Nav';
import Hero from './components/Hero';
import ProfileSection from './components/ProfileSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactInfo from './components/ContactInfo';
import Footer from './components/Footer';

import { pdfUrl, pdfFileName } from './data/cv';

export default function App() {
  // Enlaces profundos (…/cv/#experiencia): el navegador resuelve el hash antes
  // de que React monte las secciones, así que hay que repetir el salto.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }, []);

  // El PDF estático se sirve desde /public. Se descarga como blob para que el
  // atributo `download` funcione aunque PUBLIC_URL apunte a otro origen.
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      // Si el fetch falla (CORS, offline), al menos abrimos el PDF.
      window.open(pdfUrl, '_blank', 'noopener');
    }
  }, []);

  // Documento imprimible servido por la propia SPA (?cv=1): texto real,
  // seleccionable y legible por sistemas ATS.
  const openPrintable = useCallback(() => {
    window.open(`${window.location.pathname}?cv=1`, '_blank', 'noopener');
  }, []);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Fondo: retícula de puntos + halo del acento. Sin peticiones de red. */}
      <Box
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: (t) =>
            `radial-gradient(circle at 1px 1px, ${t.palette.divider} 1px, transparent 0)`,
          backgroundSize: '28px 28px',
          opacity: (t) => (t.palette.mode === 'dark' ? 0.5 : 0.7),
          maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -180,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 100%)',
          height: 420,
          zIndex: 0,
          pointerEvents: 'none',
          background: (t) =>
            `radial-gradient(ellipse at center, ${t.palette.primary.main}${
              t.palette.mode === 'dark' ? '22' : '14'
            } 0%, transparent 65%)`,
        }}
      />

      <Link
        href="#contenido"
        sx={{
          position: 'absolute',
          left: 16,
          top: -60,
          zIndex: 1300,
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          transition: 'top .2s ease',
          '&:focus-visible': { top: 16 },
        }}
      >
        Saltar al contenido
      </Link>

      <Nav onDownload={handleDownload} />

      <Container
        id="contenido"
        component="main"
        maxWidth="lg"
        sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 3 }, flexGrow: 1 }}
      >
        <Hero onDownload={handleDownload} onPrintable={openPrintable} />
        <ProfileSection />
        <ExperienceTimeline />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactInfo onDownload={handleDownload} />
      </Container>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Footer onPrintable={openPrintable} />
      </Box>
    </Box>
  );
}
