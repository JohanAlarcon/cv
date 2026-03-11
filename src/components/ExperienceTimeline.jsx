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
            date: '2024–2025',
            title: 'Desarrollador de Software',
            company: 'Alcaldía de Ibagué',
            icon: <BusinessCenter />,
            details: [
                'Desarrollo de módulos para la Plataforma Integrada de Sistemas utilizando Laravel y MySQL.',
                'Documentación de procesos siguiendo estándares definidos por la Secretaría de las TIC.',
                'Capacitación a usuarios finales y soporte técnico.',
                'Optimización de procesos internos y desarrollo de la plataforma Descubre Ibague.'
            ]
        },
        {
            date: 'Abr 2019–2025',
            title: 'Desarrollador de Software',
            company: 'SIANDSI',
            icon: <BusinessCenter />,
            details: [
                'Apps web con PHP, Laravel, React, MySQL',
                'Creacion de sitios web con NextJS y MySQL',
                'Mantenimiento de aplicaciones existentes y soporte a clientes',
                'Participación en proyectos de software a medida para clientes de diferentes sectores.'
            ]
        },
        {
            date: '2014–2019',
            title: 'Ingeniería de Sistemas',
            company: 'Univ. Cooperativa de Colombia',
            icon: <School />,
            details: [
                'Desarrollo de software,Bases de datos'
            ]
        },
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
                                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                    {item.date}
                                </Typography>
                            </TimelineOppositeContent>
                        )}

                        <TimelineSeparator>
                            <TimelineDot
                                sx={{
                                    p: 1.5,
                                    bgcolor: 'primary.50',
                                    color: 'primary.main',
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                }}
                            >
                                {item.icon}
                            </TimelineDot>
                            {idx < items.length - 1 && (
                                <TimelineConnector sx={{ bgcolor: 'divider', width: 2 }} />
                            )}
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: { xs: 2, md: '24px' }, px: { xs: 2, md: 3 } }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.2 }}
                            >
                                <Paper
                                    sx={{
                                        p: { xs: 3, md: 4 },
                                        position: 'relative',
                                        '&::before': {
                                          content: '""',
                                          position: 'absolute',
                                          left: 0,
                                          top: 0,
                                          bottom: 0,
                                          width: '4px',
                                          bgcolor: 'primary.main',
                                          borderRadius: '16px 0 0 16px',
                                        }
                                    }}
                                >
                                    {/* Fecha en pantallas pequeñas */}
                                    {isSmall && (
                                        <Typography variant="caption" color="primary.main" fontWeight={600} gutterBottom display="block">
                                            {item.date}
                                        </Typography>
                                    )}

                                    <Typography
                                        variant="h3"
                                        sx={{
                                            mb: 0.5,
                                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                                            fontWeight: 600
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        sx={{ mb: 2, fontSize: '0.95rem' }}
                                    >
                                        {item.company}
                                    </Typography>

                                    {item.details.length > 0 && (
                                        <List dense sx={{ p: 0}}>
                                            {item.details.map((detail, j) => (
                                                <ListItem key={j} sx={{ px: 0, alignItems: 'flex-start' }}>
                                                    <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                                                        <CheckCircle sx={{ fontSize: 18, color: 'accent.main' }} />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body2" color="text.primary">
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