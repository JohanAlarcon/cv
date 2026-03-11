import { Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

export default function ProjectsSection() {
  const theme = useTheme();

  const projects = [
    {
      title: 'Plataforma Descubre Ibagué',
      description: 'Plataforma oficial para la promoción turística de Ibagué. Desarrollada para la Alcaldía, permite a los usuarios explorar lugares, eventos y rutas gastronómicas de la ciudad, con un panel administrativo completo.',
      image: 'https://images.unsplash.com/photo-1596423735880-5f2a68897f1f?auto=format&fit=crop&q=80&w=600',
      tags: ['Laravel', 'MySQL', 'PHP', 'Tailwind CSS'],
      demoLink: '#',
    },
    {
      title: 'Plataforma Integrada de Sistemas',
      description: 'Sistema modular para la gestión interna de procesos de la Alcaldía. Optimizó y digitalizó flujos de trabajo previamente manuales, incluyendo manejo documental y reportes.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
      tags: ['Laravel', 'React', 'MySQL', 'Docker'],
    },
    {
      title: 'Apps Web y Sitios Corporativos',
      description: 'Múltiples proyectos desarrollados con SIANDSI incluyendo aplicaciones web personalizadas, sitios institucionales (NextJS) y sistemas de mantenimiento para clientes de diversos sectores.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
      tags: ['NextJS', 'React', 'PHP', 'MySQL'],
    }
  ];

  return (
    <Box component="section" sx={{ mb: 6 }}>
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

      <Grid container spacing={4}>
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
                    height: 200,
                    width: '100%',
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                />
                
                {/* Project Content */}
                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                        Demo
                      </Button>
                    )}
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="secondary"
                      startIcon={<GitHubIcon fontSize="small"/>}
                      sx={{ borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                    >
                      Código
                    </Button>
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
