// src/components/SkillsSection.jsx
import { Box, Typography, Chip, Paper, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Importar iconos de react-icons
import { SiLaravel, SiPhp, SiReact, SiJavascript, SiHtml5, SiCss3, SiMysql, SiGit, SiDocker, SiBootstrap, SiPhpmyadmin } from 'react-icons/si';

export default function SkillsSection() {
  const theme = useTheme();

  const skills = [
    'Laravel',
    'PHP',
    'React',
    'JavaScript',
    'HTML5',
    'CSS3',
    'MySQL',
    'Git',
    'Docker',
    'Bootstrap',
    'Filament',
  ];

  // Mapa: nombre de skill -> icono
  const skillIcons = {
    Laravel: SiLaravel,
    PHP: SiPhp,
    React: SiReact,
    JavaScript: SiJavascript,
    HTML5: SiHtml5,
    CSS3: SiCss3,
    MySQL: SiMysql,
    Git: SiGit,
    Docker: SiDocker,
    Bootstrap: SiBootstrap,
    // Filament no tiene icono oficial en react-icons; usamos un icono genérico
    Filament: SiPhpmyadmin,
  };

  return (
    <Box component="section">
      <Typography
        variant="h2"
        color="primary"
        gutterBottom
        sx={{
          mb: 4,
          display: 'inline-block',
        }}
      >
        Competencias técnicas
      </Typography>

      <Paper
        sx={{
          p: { xs: 5, sm: 12, md: 12, lg: 8 },
        }}
      >
        {/* ===== Grid responsive de Chips ===== */}
        <Box
          component="ul"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',   
              sm: 'repeat(3, 1fr)',   
              md: 'repeat(4, 1fr)',
              lg: 'repeat(9, 1fr)',
            },
            gap: 2,
            listStyle: 'none',
            p: 0,
            m: 0,
          }}
        >
          {skills.map((skill) => {
            const IconComponent = skillIcons[skill];

            return (
              <Box component="li" key={skill} sx={{ textAlign: 'center' }}>
                <Chip
                  label={skill}
                  variant="outlined"
                  avatar={
                    IconComponent ? (
                      <Avatar sx={{ bgcolor: 'transparent', color: 'inherit' }}>
                        <IconComponent size={18} />
                      </Avatar>
                    ) : undefined
                  }
                  sx={{
                    width: '100%',
                    py: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    justifyContent: 'flex-start',
                    pl: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#eef2ff',
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                    '& .MuiChip-avatar': {
                      color: 'inherit'
                    }
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}