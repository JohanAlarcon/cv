import { Box, Avatar, Typography, Container, Button, useTheme, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import PrintIcon from '@mui/icons-material/Print';
import CodeIcon from '@mui/icons-material/Code';

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
      component={motion.section}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        background: `radial-gradient(circle at top right, ${theme.palette.primary.light}20 0%, transparent 40%),
                     radial-gradient(circle at bottom left, ${theme.palette.accent.main}20 0%, transparent 40%),
                     linear-gradient(to bottom right, ${theme.palette.primary.dark}, #111827)`,
        color: '#fff',
      }}
    >
      {/* Decorative backdrop elements */}
      <Box sx={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: `${theme.palette.primary.main}40`, filter: 'blur(80px)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '250px', height: '250px', borderRadius: '50%', background: `${theme.palette.accent.main}30`, filter: 'blur(60px)', zIndex: 0 }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 5, md: 7 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <Avatar
              src={`${process.env.PUBLIC_URL}/perfil.jpg`}
              alt="Johan Alarcón"
              sx={{
                width: { xs: 96, md: 128 },
                height: { xs: 96, md: 128 },
                mx: 'auto',
                mb: 2.5,
                border: `4px solid rgba(255, 255, 255, 0.2)`,
                backgroundClip: 'padding-box',
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
              }}
            />
          </motion.div>

          <Chip 
            icon={<CodeIcon fontSize="small" />} 
            label="Open to work" 
            color="success" 
            size="small" 
            sx={{ mb: 2, fontWeight: 600, bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.5)' }} 
          />

          <Typography
            variant="h1"
            component={motion.h1}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            sx={{
              color: '#fff',
              mb: 1.5,
              px: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Johan Darío Alarcón
          </Typography>

          <Typography
            component={motion.p}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            sx={{
              mb: 3.5,
              fontWeight: 400,
              maxWidth: '540px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.6,
            }}
          >
            Software Engineer especializado en ecosistemas web modernos (PHP/Laravel). Construyendo soluciones de alto rendimiento.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'accent.main',
                color: '#fff',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': { bgcolor: 'accent.dark' },
              }}
              startIcon={<PrintIcon />}
              onClick={handleDownload}
            >
              Descargar CV
            </Button>
            
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="outlined"
              size="large"
              href="mailto:johandarioalarcon@gmail.com"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#fff',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                borderWidth: 2,
                '&:hover': { borderColor: '#fff', borderWidth: 2, bgcolor: 'rgba(255,255,255,0.05)' },
              }}
            >
              Contactar
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}