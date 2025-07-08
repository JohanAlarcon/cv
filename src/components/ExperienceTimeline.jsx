// src/components/ExperienceTimeline.jsx
import { useTheme, useMediaQuery, Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent
} from '@mui/lab';
import { BusinessCenter, School, CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function ExperienceTimeline() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const timelinePosition = isSmall ? 'right' : 'alternate';

    const items = [
        {
            date: '2024–Presente',
            title: 'Desarrollador de Software',
            company: 'Alcaldía de Ibagué',
            icon: <BusinessCenter />,
            details: [
                'Módulos Laravel + MySQL',
                'Documentación TIC',
                'Capacitación y soporte',
                '+30 % eficiencia'
            ]
        },
        {
            date: 'Abr 2019–Presente',
            title: 'Desarrollador de Software',
            company: 'SIANDSI',
            icon: <BusinessCenter />,
            details: [
                'Apps web con PHP, Laravel, JS, MySQL',
                'Automatización: –25 % tiempos'
            ]
        },
        {
            date: '2014–2019',
            title: 'Ingeniería de Sistemas',
            company: 'Univ. Cooperativa de Colombia',
            icon: <School />,
            details: []
        },
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
                Experiencia Laboral
            </Typography>

            <Timeline
                position={timelinePosition}
                sx={{
                    px: { xs: 0, md: 2 },
                    '& .MuiTimelineItem-root': { minHeight: { xs: 80, md: 120 } }
                }}
            >
                {items.map((item, idx) => (
                    <TimelineItem key={idx}>
                        {/* Fecha en pantallas grandes */}
                        {!isSmall && (
                            <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                                <Typography variant="caption" color="text.secondary">
                                    {item.date}
                                </Typography>
                            </TimelineOppositeContent>
                        )}

                        <TimelineSeparator>
                            <TimelineDot
                                color="secondary"
                                sx={{
                                    p: 1.3,
                                    border: `2px solid ${theme.palette.primary.main}`
                                }}
                            >
                                {item.icon}
                            </TimelineDot>
                            {idx < items.length - 1 && (
                                <TimelineConnector sx={{ bgcolor: 'primary.main', width: 2 }} />
                            )}
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: { xs: 1, md: '12px' }, px: 2 }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.2 }}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: { xs: 2, md: 3 },
                                        backgroundColor: 'background.paper',
                                        borderLeft: `4px solid ${theme.palette.accent.main}`,
                                        borderRadius: 2
                                    }}
                                >
                                    {/* Fecha en pantallas pequeñas */}
                                    {isSmall && (
                                        <Typography variant="caption" color="text.secondary" gutterBottom>
                                            {item.date}
                                        </Typography>
                                    )}

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '1.25rem' },
                                            fontWeight: 600
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {item.company}
                                    </Typography>

                                    {item.details.length > 0 && (
                                        <List dense sx={{ p: 0}}>
                                            {item.details.map((detail, j) => (
                                                <ListItem key={j} sx={{ px: 0 }}>
                                                    <ListItemIcon sx={{ minWidth: 32, color: 'secondary.main' }}>
                                                        <CheckCircle fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                                                                {detail}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </Paper>
                            </motion.div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
}