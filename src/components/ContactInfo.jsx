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
    <Box component="section" sx={{ mt: 4 }}>
      {/* Título de sección */}
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
        Contacto
      </Typography>

      {/* Contenedor animado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3 },
            borderLeft: `4px solid ${theme.palette.accent.main}`,
            backgroundColor: 'background.paper',
            borderRadius: 2
          }}
        >
          <Grid container spacing={2}  justifyContent="center" alignItems="center">
            {/* Datos de contacto */}
            {contacts.map(({ Icon, label, href }, idx) => (
              <Grid 
                item 
                key={idx} 
                xs={12} 
                sm={6} 
                md={4}
              >
                <Box 
                  display="flex" 
                  alignItems="center" 
                  sx={{
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                  }}
                >
                  <Icon 
                    color="primary" 
                    fontSize="small" 
                    sx={{ mr: 1 }} 
                  />
                  {href ? (
                    <Link 
                      href={href}
                      variant="body2"
                      underline="hover"
                      sx={{ wordBreak: 'break-all' }}
                    >
                      {label}
                    </Link>
                  ) : (
                    <Typography variant="body2">
                      {label}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}

            {/* Iconos sociales / CV */}
            {socials.map(({ Icon, title, href }, idx) => (
              <Grid  item  key={idx}  xs={4}  sm={2}  md={2}>
                <Box 
                  display="flex" 
                  justifyContent="center"
                >
                  <Tooltip title={title}>
                    <IconButton
                      href={href}
                      color="primary"
                      sx={{
                        transition: 'transform 0.2s ease, color 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.2)',
                          color: theme.palette.secondary.main
                        }
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </motion.div>
    </Box>
  );
}