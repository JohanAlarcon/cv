import { Box, Typography, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';

export default function AchievementsSection() {
    const theme = useTheme();

    const achievements = [
        "Implementación exitosa de una plataforma 'Descubre Ibague' para la Alcaldía de Ibagué, mostrando el potencial turístico de la ciudad.",
        'Reconocido como "Empleado del Mes" en SIANDSI por la entrega de proyectos antes del plazo establecido.'
    ];

    return (
        <Box component="section" sx={{ mb: 6 }}>
            <Typography
                variant="h2"
                color="primary"
                gutterBottom
                sx={{
                    mb: 4,
                    display: 'inline-block',
                }}
            >
                Logros
            </Typography>

            {/* Grid responsive de tarjetas */}
            <Grid container spacing={4}>
                {achievements.map((text, idx) => (
                    <Grid item xs={12} key={idx}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <Paper
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    p: { xs: 3, md: 4 },
                                    height: '100%',
                                }}
                            >
                                <EmojiEventsIcon
                                    sx={{
                                        color: 'accent.main',
                                        fontSize: 32,
                                        mr: 2,
                                        mt: 0.25,
                                        flexShrink: 0
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        lineHeight: 1.6,
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