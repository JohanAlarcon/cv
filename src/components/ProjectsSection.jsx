import { Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import LaunchIcon from '@mui/icons-material/Launch';

export default function ProjectsSection() {
  const theme = useTheme();

  const projects = [
    {
      title: 'Plataforma Descubre Ibagué',
      description: 'Plataforma oficial para la promoción turística de Ibagué. Desarrollada para la Alcaldía, permite a los usuarios explorar lugares, eventos y rutas gastronómicas de la ciudad, con un panel administrativo completo.',
      image: `${process.env.PUBLIC_URL}/descubre-ibague.png`,
      tags: ['Laravel', 'MySQL', 'PHP', 'Vue'],
      demoLink: 'https://turismo.ibague.gov.co/',
    },
    {
      title: 'Sistema de Gestión para Barberías',
      description: 'Aplicación web diseñada para la gestión integral de barberías. Incluye agendamiento de citas, calendario interactivo, y un panel de control para el seguimiento preciso de los ingresos y comisiones del salón.',
      image: `${process.env.PUBLIC_URL}/barbershop_dashboard.jpg`,
      tags: ['React', 'Nest.js', 'MUI', 'MySQL'],
      demoLink: 'https://stylecloud.online/',
    },
    {
      title: 'Curaduría Cloud | Software Especializado',
      description: 'Solución definitiva en la nube para la gestión integral de Curadurías Urbanas en Colombia. Facilita la radicación digital, control de expedientes y el cumplimiento de la Ley 388 y el Decreto 1077.',
      image: 'https://JohanAlarcon.github.io/landing-page-curaduria/images/hero-bg_2.png',
      tags: ['Laravel', 'Livewire', 'Gestión Documental'],
      demoLink: 'https://johanalarcon.github.io/landing-page-curaduria/',
    }
  ];

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography
        variant="h2"
        color="primary"
        gutterBottom
        sx={{
          position: 'relative',
          mb: 4,
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -6,
            left: 0,
            width: '60%',
            height: 4,
            bgcolor: 'accent.main',
            borderRadius: 2,
          },
        }}
      >
        Proyectos Destacados
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project, idx) => (
          <Grid item xs={12} md={6} lg={4} key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{ height: '100%' }}
            >
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflow: 'hidden',
                  p: 0,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  }
                }}
              >
                {/* Project Image */}
                <Box
                  sx={{
                    height: 160,
                    width: '100%',
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                />
                
                {/* Project Content */}
                <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h3" sx={{ mb: 1, fontSize: '1.25rem' }}>
                    {project.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 3, flexGrow: 1 }}>
                    {project.description}
                  </Typography>
                  
                  {/* Tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {project.tags.map(tag => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'primary.50',
                          color: 'primary.main',
                          fontWeight: 500
                        }} 
                      />
                    ))}
                  </Box>
                  
                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                    {project.demoLink && (
                      <Button 
                        size="small" 
                        variant="contained" 
                        endIcon={<LaunchIcon fontSize="small"/>}
                        href={project.demoLink}
                        target="_blank"
                      >
                        App
                      </Button>
                    )}
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
