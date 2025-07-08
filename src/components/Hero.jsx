import { Box, Avatar, Typography, Container, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import PrintIcon from '@mui/icons-material/Print';

export default function Hero() {
  const theme = useTheme();
  const pdfUrl = `${process.env.PUBLIC_URL}/Hoja_de_Vida_Johan_Dario_Alarcon.pdf`;

   const handleDownload = async () => {
    try {
      const resp = await fetch(pdfUrl);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Hoja_de_Vida_Johan_Dario_Alarcon.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error descargando CV:', err);
    }
  };
  return (
    <Box
      component="section"
      sx={{
        // ==== Fondo con degradado y clip-path para forma inclinada ====
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
        color: '#fff',
        clipPath: {
          xs: 'none',
          md: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
        },
      }}
    >
      <Container maxWidth="md">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            textAlign: 'center',
            py: { xs: 6, sm: 8, md: 10 },
          }}
        >
          <Avatar
            src={`${process.env.PUBLIC_URL}/perfil.jpg`}
            alt="Johan Alarcón"
            sx={{
              width: { xs: 80, sm: 100, md: 128 },
              height: { xs: 80, sm: 100, md: 128 },
              mx: 'auto',
              mb: { xs: 2, sm: 3 },
              border: `4px solid #fff`,
              boxShadow: 3,
            }}
          />

          <Typography
            variant="h1"
            component={motion.h1}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: { xs: 1, sm: 2 },
              lineHeight: 1.2,
            }}
          >
            Johan Darío Alarcón Ayala
          </Typography>

          <Typography
            variant="h4"
            component={motion.h4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 500,
              opacity: 0.9,
              mb: { xs: 3, sm: 4 },
            }}
          >
            Ingeniero de Sistemas
          </Typography>

          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<PrintIcon />}
            onClick={handleDownload}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textTransform: 'none',
            }}            
          >
            Descargar CV
          </Button>
        </Box>
      </Container>
    </Box>
  );
}