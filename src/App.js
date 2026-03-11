import { Container, Grid, Box, GlobalStyles } from '@mui/material';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ContactInfo from './components/ContactInfo';
import SkillsSection from './components/SkillsSection';
import ProfileSection from './components/ProfileSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import AchievementsSection from './components/AchievementsSection';

const animations = {
  hero: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  contact: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, delay: 0.2 },
  },
  skills: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.3 },
  },
  profile: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  },
  projects: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.5 },
  },
  experience: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.6 },
  },
  achievements: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.7 },
  },
};

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
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Container maxWidth="lg" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
            {/* Hero */}
            <motion.div {...animations.hero}>
              <Hero />
            </motion.div>
            
            <Grid container spacing={4} mt={4}>
              {/* Profile */}
              <Grid item xs={12}>
                 <motion.div {...animations.profile}>
                  <ProfileSection />
                </motion.div>
              </Grid>

              {/* Skills */}
              <Grid item xs={12}>
                <motion.div {...animations.skills}>
                  <SkillsSection />
                </motion.div>
              </Grid>
              
              {/* Projects */}
              <Grid item xs={12}>
                <motion.div {...animations.projects}>
                  <ProjectsSection />
                </motion.div>
              </Grid>

              {/* Experience */}
              <Grid item xs={12}>
                <motion.div {...animations.experience}>
                  <ExperienceTimeline />
                </motion.div>
              </Grid>

              {/* Contact & Achievements Container */}
              <Grid item xs={12} md={5}>
                <motion.div {...animations.contact}>
                  <ContactInfo />
                </motion.div>
              </Grid>
              <Grid item xs={12} md={7}>
                <motion.div {...animations.achievements}>
                  <AchievementsSection />
                </motion.div>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}