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
          variant="h2"
          color="primary"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Perfil Profesional
        </Typography>
        <Paper
          sx={{
            p: { xs: 3, sm: 4 },
          }}
        >

          {/* Texto descriptivo */}
          <Typography
            variant="body1"
            sx={{
              textAlign: 'justify',
            }}
          >
            <strong>Desarrollador de Software</strong> con más de 5 años de experiencia en el ciclo completo de vida de
            aplicaciones web y sistemas empresariales. Experto en el ecosistema <strong>PHP / Laravel</strong> y en la creación de interfaces interactivas con <strong>JavaScript / React</strong>. Me apasiona resolver problemas técnicos complejos creando arquitecturas limpias y escalables, manteniendo siempre el foco en la experiencia del usuario y en aportar valor real al negocio.
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}