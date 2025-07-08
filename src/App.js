
import { Container, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ContactInfo from './components/ContactInfo';
import SkillsSection from './components/SkillsSection';
import ProfileSection from './components/ProfileSection';
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
  experience: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.5 },
  },
  achievements: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, delay: 0.6 },
  },
};

export default function App() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #eef2f3 0%, #ffffff 100%)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero */}
        <motion.div {...animations.hero}>
          <Hero />
        </motion.div>

        {/* Contact */}
        <motion.div {...animations.contact}>
          <ContactInfo />
        </motion.div>

        <Grid container spacing={4} mt={2}>
          {/* Skills */}
          <Grid item xs={12} md={4}>
            <motion.div {...animations.skills}>
              <SkillsSection />
            </motion.div>
          </Grid>

          {/* Profile, Experience & Achievements */}
          <Grid item xs={12} md={8} container direction="column">
            <Grid item>
              <motion.div {...animations.profile}>
                <ProfileSection />
              </motion.div>
            </Grid>
            <Grid item>
              <motion.div {...animations.experience}>
                <ExperienceTimeline />
              </motion.div>
              <motion.div {...animations.achievements}>
                <AchievementsSection />
              </motion.div>
            </Grid>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}