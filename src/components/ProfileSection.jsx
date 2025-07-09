// src/components/ProfileSection.jsx
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

export default function ProfileSection() {

  const theme = useTheme();

  return (
    <Box component="section">
      {/* Animación de entrada */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          color="primary"
          gutterBottom
          sx={{
            position: 'relative',
            fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
            fontWeight: 600,
            mb: 2,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: 40,
              height: 4,
              bgcolor: 'accent.light',
              borderRadius: 2
            }
          }}
        >
          Perfil profesional
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderLeft: `4px solid ${theme.palette.accent.main}`,
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >

          {/* Texto descriptivo */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1rem' },
              textAlign: 'justify',
              lineHeight: 1.6,
              color: 'text.primary',
            }}
          >
            <strong>Desarrollador de software</strong> con 5 años de experiencia en el desarrollo
            de aplicaciones web y sistemas a medida. Experto en <strong>PHP</strong>, <strong>Laravel</strong>,
            <strong>JavaScript</strong> y <strong>MySQL</strong>. Me caracterizo por escribir código limpio,
            escalable y por mi capacidad de adaptación a nuevas tecnologías y
            metodologías ágiles.
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}