// src/components/AchievementsSection.jsx
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';

export default function AchievementsSection() {
    const theme = useTheme();

    const achievements = [
        'Sistema de gestión de datos Alcaldía: –30 % tiempo de procesamiento',
        'Empleado del Mes en SIANDSI por entregas anticipadas'
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
                Logros
            </Typography>

            {/* Grid responsive de tarjetas */}
            <Grid container spacing={2}>
                {achievements.map((text, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                        >
                            <Paper
                                elevation={3}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: { xs: 2, md: 3 },
                                    borderLeft: `4px solid ${theme.palette.accent.main}`,
                                    borderRadius: 1,
                                    backgroundColor: 'background.paper',
                                    height: '100%',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <EmojiEventsIcon
                                    sx={{
                                        color: 'accent.main',
                                        fontSize: { xs: 28, md: 32 },
                                        mr: 2,
                                        flexShrink: 0
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        lineHeight: 1.5,
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    {text}
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}