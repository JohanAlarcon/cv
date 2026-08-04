// src/components/Footer.jsx
import { Box, Container, Typography, Stack, Link } from '@mui/material';
import { profile, contact } from '../data/cv';

export default function Footer({ onPrintable }) {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', mt: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 }, py: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={1.5}
        >
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            © {year} {profile.name} · {profile.role}
          </Typography>

          <Stack direction="row" spacing={2.5} alignItems="center">
            <Link
              component="button"
              onClick={onPrintable}
              sx={{ fontSize: '0.78rem', color: 'text.disabled', border: 0, bgcolor: 'transparent', cursor: 'pointer' }}
            >
              Versión imprimible
            </Link>
            <Link href={contact.emailHref} sx={{ fontSize: '0.78rem', color: 'text.disabled' }}>
              {contact.email}
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
