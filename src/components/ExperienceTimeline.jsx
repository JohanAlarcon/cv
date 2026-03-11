// src/components/ExperienceTimeline.jsx
import { useTheme, useMediaQuery, Box, Typography, Paper, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent
} from '@mui/lab';
import { BusinessCenter, School, CheckCircle, CalendarMonth } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function ExperienceTimeline() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const items = [
        {
            date: '2024–2026',
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
                'Desarrollo de software, Bases de datos'
            ]
        },
    ];

    /* ─── Detalle reutilizable (tarjeta interna) ─── */
    const CardContent = ({ item, showDate }) => (
        <Paper
            sx={{
                p: { xs: 2.5, md: 4 },
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
                },
            }}
        >
            {showDate && (
                <Chip
                    icon={<CalendarMonth sx={{ fontSize: 14 }} />}
                    label={item.date}
                    size="small"
                    sx={{
                        mb: 1.5,
                        bgcolor: '#eef2ff',
                        color: 'primary.main',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 26,
                    }}
                />
            )}

            <Typography
                variant="h3"
                sx={{
                    mb: 0.5,
                    fontSize: { xs: '1.05rem', md: '1.3rem' },
                    fontWeight: 600,
                }}
            >
                {item.title}
            </Typography>

            <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1.5, fontSize: { xs: '0.85rem', md: '0.95rem' } }}
            >
                {item.company}
            </Typography>

            {item.details.length > 0 && (
                <List dense sx={{ p: 0 }}>
                    {item.details.map((detail, j) => (
                        <ListItem key={j} sx={{ px: 0, py: 0.25, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 24, mt: 0.5 }}>
                                <CheckCircle sx={{ fontSize: 16, color: 'accent.main' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                        sx={{ fontSize: { xs: '0.82rem', md: '0.875rem' }, lineHeight: 1.5 }}
                                    >
                                        {detail}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );

    /* ─── Layout MOBILE: tarjetas apiladas sin timeline ─── */
    if (isSmall) {
        return (
            <Box component="section" sx={{ mb: 4 }}>
                <Typography
                    variant="h2"
                    color="primary"
                    gutterBottom
                    sx={{ mb: 3, display: 'inline-block' }}
                >
                    Experiencia Laboral
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.12 }}
                        >
                            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                {/* Mini indicador vertical */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        pt: 1.5,
                                        flexShrink: 0,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '10px',
                                            bgcolor: '#eef2ff',
                                            color: 'primary.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px solid',
                                            borderColor: 'primary.main',
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                    {idx < items.length - 1 && (
                                        <Box sx={{ width: 2, flexGrow: 1, bgcolor: 'divider', mt: 1 }} />
                                    )}
                                </Box>

                                {/* Tarjeta */}
                                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <CardContent item={item} showDate />
                                </Box>
                            </Box>
                        </motion.div>
                    ))}
                </Box>
            </Box>
        );
    }

    /* ─── Layout DESKTOP: timeline alternante clásica ─── */
    return (
        <Box component="section" sx={{ mb: 4 }}>
            <Typography
                variant="h2"
                color="primary"
                gutterBottom
                sx={{ mb: 4, display: 'inline-block' }}
            >
                Experiencia Laboral
            </Typography>

            <Timeline
                position="alternate"
                sx={{
                    px: 2,
                    '& .MuiTimelineItem-root': { minHeight: 120 },
                }}
            >
                {items.map((item, idx) => (
                    <TimelineItem key={idx}>
                        <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                {item.date}
                            </Typography>
                        </TimelineOppositeContent>

                        <TimelineSeparator>
                            <TimelineDot
                                sx={{
                                    p: 1.5,
                                    bgcolor: '#eef2ff',
                                    color: 'primary.main',
                                    border: '2px solid',
                                    borderColor: 'primary.main',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            >
                                {item.icon}
                            </TimelineDot>
                            {idx < items.length - 1 && (
                                <TimelineConnector sx={{ bgcolor: 'divider', width: 2 }} />
                            )}
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: '24px', px: 3 }}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.15 }}
                            >
                                <CardContent item={item} showDate={false} />
                            </motion.div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
}