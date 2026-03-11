// src/components/ContactInfo.jsx
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Link, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  LocationOn,
  Phone,
  Email,
  LinkedIn,
  GitHub,
  Facebook
} from '@mui/icons-material';

export default function ContactInfo() {
  const theme = useTheme();

  const contacts = [
    { Icon: LocationOn, label: 'Ibagué, Colombia' },
    { Icon: Phone,      label: '317 682 4754' },
    { Icon: Email,      label: 'johandarioalarcon@gmail.com', href: 'mailto:johandarioalarcon@gmail.com' },
  ];

  const socials = [
    { Icon: LinkedIn,     title: 'LinkedIn',    href: 'https://linkedin.com/in/johan-alarcon-2864812b7/' },
    { Icon: GitHub,       title: 'GitHub',      href: 'https://github.com/JohanAlarcon' },
    { Icon: Facebook,     title: 'Facebook',    href: 'https://www.facebook.com/alarconjohan' },
  ];

  return (
    <Box component="section" sx={{ mb: 6 }}>
      {/* Título de sección */}
      <Typography
        variant="h2"
        color="primary"
        gutterBottom
        sx={{
          mb: 4,
          display: 'inline-block',
        }}
      >
        Contacto
      </Typography>

      {/* Contenedor animado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: { xs: 3, sm: 4 },
          }}
        >
          <Grid container spacing={3} direction="column">
            {/* Datos de contacto */}
            <Grid item>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {contacts.map(({ Icon, label, href }, idx) => (
                  <Box 
                    key={idx}
                    display="flex" 
                    alignItems="center" 
                  >
                    <Box 
                       sx={{
                         bgcolor: 'primary.50',
                         color: 'primary.main',
                         p: 1.5,
                         borderRadius: '12px',
                         display: 'flex',
                         mr: 2,
                       }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    {href ? (
                      <Link 
                        href={href}
                        variant="body1"
                        underline="none"
                        sx={{ 
                          wordBreak: 'break-all', 
                          fontWeight: 500,
                          '&:hover': { color: 'accent.main' }
                        }}
                      >
                        {label}
                      </Link>
                    ) : (
                      <Typography variant="body1" fontWeight={500}>
                        {label}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Divider */}
            <Grid item>
                <Box sx={{ height: '1px', bgcolor: 'divider', my: 1 }} />
            </Grid>

            {/* Iconos sociales / CV */}
            <Grid item>
              <Box display="flex" gap={2}>
                {socials.map(({ Icon, title, href }, idx) => (
                    <Tooltip title={title} key={idx}>
                      <IconButton
                        href={href}
                        target="_blank"
                        sx={{
                          bgcolor: 'transparent',
                          border: '1px solid',
                          borderColor: 'divider',
                          color: 'text.secondary',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            color: 'primary.main',
                            borderColor: 'primary.main',
                            bgcolor: 'primary.50'
                          }
                        }}
                      >
                        <Icon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Box>
  );
}