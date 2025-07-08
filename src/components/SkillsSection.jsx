// src/components/SkillsSection.jsx
import { Box, Typography, Chip, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function SkillsSection() {
  const theme = useTheme();

  const skills = [
    'Laravel', 'PHP',
    'React', 'JavaScript', 'HTML5', 'CSS3',
    'MySQL', 'Git', 'Docker', 'Bootstrap', 'Filament'
  ];

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
            borderRadius: 2
          }
        }}
      >
        Competencias técnicas
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

        {/* ===== Grid responsive de Chips ===== */}
        <Box
          component="ul"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(3, 1fr)',  // 3 columnas en móviles
              sm: 'repeat(6, 1fr)',  // 6 en tablets
              md: 'repeat(15, 1fr)',  // 1 en desktop
            },
            gap: 1.5,
            listStyle: 'none',
            p: 2,
            m: 0,
          }}
        >
          {skills.map((skill) => (
            <Box component="li" key={skill} sx={{ textAlign: 'center' }}>
              <Chip
                label={skill}
                color="secondary"
                size="small"
                sx={{
                  width: '100%',
                  fontWeight: 500,
                  py: 0.5,
                  transition: 'transform 0.2s ease, background-color 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: 'secondary.light',
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}