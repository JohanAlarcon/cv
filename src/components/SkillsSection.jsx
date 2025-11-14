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
            borderRadius: 2,
          },
        }}
      >
        Competencias técnicas
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, sm: 3 },
          borderLeft: `4px solid ${theme.palette.accent.main}`,
          backgroundColor: 'background.paper',
          borderRadius: 2,
        }}
      >
        {/* ===== Grid responsive de Chips ===== */}
        <Box
          component="ul"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',   // 2 columnas en móviles
              sm: 'repeat(6, 1fr)',   // 6 en tablets
              md: 'repeat(10, 1fr)',  // 10 en desktop (una por skill)
            },
            gap: 1.5,
            listStyle: 'none',
            p: 2,
            m: 0,
          }}
        >
          {skills.map((skill) => {
            const IconComponent = skillIcons[skill];

            return (
              <Box component="li" key={skill} sx={{ textAlign: 'center' }}>
                <Chip
                  label={skill}
                  color="secondary"
                  size="medium"
                  avatar={
                    IconComponent ? (
                      <Avatar
                        sx={{
                          bgcolor: 'transparent',
                          color: 'inherit',
                        }}
                      >
                        <IconComponent size={18} />
                      </Avatar>
                    ) : undefined
                  }
                  sx={{
                    width: '100%',
                    fontWeight: 500,
                    py: 0.5,
                    justifyContent: 'flex-start',
                    pl: 0.5,
                    transition: 'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: 'secondary.light',
                      boxShadow: 3,
                    },
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