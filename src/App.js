import { Container, Grid, Box, GlobalStyles } from '@mui/material';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ContactInfo from './components/ContactInfo';
import SkillsSection from './components/SkillsSection';
import ProfileSection from './components/ProfileSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import AchievementsSection from './components/AchievementsSection';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          'html, body, #root': {
            height: '100%',
            margin: 0,
            padding: 0,
            scrollBehavior: 'smooth',
          },
        }}
      />
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundBlendMode: 'overlay',
          position: 'relative',
          '&::before': {
            //position: 'relative',
            position: 'absolute',
            content: '""',
            inset: 0,
            backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
            backgroundSize: 'cover, auto',
            backgroundPosition: 'center',
            opacity: 0.05,          // ajusta opacidad al gusto (0.0–1.0)
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>

          {/* ── Hero ─────────────────────────────── */}
          <motion.div {...fadeUp(0)}>
            <Hero />
          </motion.div>

          <Grid container spacing={3} mt={2}>

            {/* ── Row 1: Profile (left) + Skills (right) ── */}
            <Grid item xs={12} md={5}>
              <motion.div {...fadeUp(0.1)}>
                <ProfileSection />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div {...fadeUp(0.15)}>
                <SkillsSection />
              </motion.div>
            </Grid>

            {/* ── Row 2: Projects (full width) ── */}
            <Grid item xs={12}>
              <motion.div {...fadeUp(0.2)}>
                <ProjectsSection />
              </motion.div>
            </Grid>

            {/* ── Row 3: Experience (full width) ── */}
            <Grid item xs={12}>
              <motion.div {...fadeUp(0.25)}>
                <ExperienceTimeline />
              </motion.div>
            </Grid>

            {/* ── Row 4: Contact (left) + Achievements (right) ── */}
            <Grid item xs={12} md={5}>
              <motion.div {...fadeUp(0.3)}>
                <ContactInfo />
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div {...fadeUp(0.35)}>
                <AchievementsSection />
              </motion.div>
            </Grid>

          </Grid>
        </Container>
      </Box>
    </>
  );
}

