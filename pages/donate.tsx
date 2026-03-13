import GitHubIcon from '@mui/icons-material/GitHub';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { Box, Button, Chip, Container, Link as MuiLink, Paper, Stack, Typography } from '@mui/material';
import { useAppContext } from 'context/app-context';
import { BUY_ME_A_COFFEE_URL, GITHUB_URL, PAYPAL_URL } from 'lib/config/constants';

const introPoints = [
  'Practical apps, such as tools for tracking income and expenses, splitting shared costs, and understanding spending habits.',
  'Open source projects on GitHub, where I explore ideas, share tools, and build in public.',
];

export default function DonatePage() {
  const { themeMode } = useAppContext();
  const isDark = themeMode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        px: 2,
        background: isDark
          ? 'radial-gradient(circle at top, rgba(23, 37, 84, 0.8), rgba(10, 10, 10, 0.96) 55%)'
          : 'radial-gradient(circle at top, rgba(191, 219, 254, 0.95), rgba(248, 250, 252, 1) 58%)',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: 6,
            border: '1px solid',
            borderColor: isDark ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.08)',
            background: isDark ? 'rgba(15, 23, 42, 0.78)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(14px)',
            boxShadow: isDark ? '0 24px 80px rgba(0, 0, 0, 0.38)' : '0 24px 80px rgba(15, 23, 42, 0.08)',
          }}
        >
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Chip
                  label="Support my work"
                  sx={{
                    width: 'fit-content',
                    fontWeight: 700,
                    bgcolor: isDark ? 'rgba(56, 189, 248, 0.14)' : 'rgba(14, 165, 233, 0.12)',
                    color: isDark ? '#7dd3fc' : '#075985',
                  }}
                />

                <Box
                  component="img"
                  src="/logo.png"
                  alt="Panos logo"
                  sx={{
                    width: { xs: 40, sm: 46 },
                    height: { xs: 40, sm: 46 },
                    objectFit: 'contain',
                    flexShrink: 0,
                  }}
                />
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.1rem', sm: '3rem' },
                  lineHeight: 1.05,
                  fontWeight: 800,
                  color: isDark ? '#f8fafc' : '#0f172a',
                  maxWidth: 700,
                }}
              >
                Open source projects and practical apps.
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: isDark ? 'rgba(226, 232, 240, 0.9)' : 'rgba(15, 23, 42, 0.82)',
                  maxWidth: 720,
                }}
              >
                Hi, I&apos;m known as Panos. I build small, thoughtful tools and open-source projects.
              </Typography>
            </Stack>

            <Stack spacing={2.5}>
              <Typography
                sx={{
                  fontSize: '1.02rem',
                  color: isDark ? 'rgba(203, 213, 225, 0.9)' : 'rgba(30, 41, 59, 0.86)',
                }}
              >
                My work generally falls into two areas:
              </Typography>

              <Stack component="ul" spacing={1.5} sx={{ pl: 3, m: 0 }}>
                {introPoints.map((point) => (
                  <Typography
                    key={point}
                    component="li"
                    sx={{
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: isDark ? 'rgba(203, 213, 225, 0.92)' : 'rgba(30, 41, 59, 0.92)',
                    }}
                  >
                    {point}
                  </Typography>
                ))}
              </Stack>

              <Typography
                sx={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: isDark ? 'rgba(203, 213, 225, 0.92)' : 'rgba(30, 41, 59, 0.92)',
                  maxWidth: 760,
                }}
              >
                Some projects are products, others are open source, but they come from the same interest in building
                things that are simple and useful.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{
                pt: 1,
                alignItems: 'stretch',
              }}
            >
              <Button
                href={BUY_ME_A_COFFEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                variant="text"
                aria-label="Buy me a coffee"
                sx={{
                  flex: 1,
                  p: 0,
                  minHeight: 58,
                  borderRadius: 999,
                  overflow: 'hidden',
                  position: 'relative',
                  textTransform: 'none',
                  alignSelf: 'stretch',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  backgroundColor: '#FFDD00',
                  boxShadow: '0 16px 36px rgba(234, 179, 8, 0.18)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(115deg, transparent 20%, rgba(255, 255, 255, 0.38) 50%, transparent 80%)',
                    transform: 'translateX(-140%)',
                    transition: 'transform 0.55s ease',
                    pointerEvents: 'none',
                  },
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.01)',
                    boxShadow: '0 20px 42px rgba(234, 179, 8, 0.24)',
                    backgroundColor: '#FFDD00',
                  },
                  '&:hover::before': {
                    transform: 'translateX(140%)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: { xs: 58, sm: 60 },
                    px: 2,
                    py: 0.75,
                  }}
                >
                  <Box
                    component="img"
                    src="/bmc-button.png"
                    alt="Buy Me a Coffee"
                    sx={{
                      display: 'block',
                      width: '100%',
                      maxWidth: 240,
                      maxHeight: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Button>

              <Button
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                startIcon={<PaymentOutlinedIcon />}
                variant="outlined"
                sx={{
                  flex: 1,
                  py: 1.6,
                  borderRadius: 999,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderWidth: 1.5,
                  color: isDark ? '#e2e8f0' : '#0f172a',
                  borderColor: isDark ? 'rgba(148, 163, 184, 0.36)' : 'rgba(15, 23, 42, 0.16)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderWidth: 1.5,
                    borderColor: isDark ? 'rgba(148, 163, 184, 0.56)' : 'rgba(15, 23, 42, 0.28)',
                    bgcolor: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(15, 23, 42, 0.03)',
                  },
                }}
              >
                Donate with PayPal
              </Button>
            </Stack>

            <Typography
              sx={{
                fontSize: '0.95rem',
                color: isDark ? 'rgba(148, 163, 184, 0.95)' : 'rgba(71, 85, 105, 0.95)',
              }}
            >
              If you prefer to follow the work first, you can also find my projects on{' '}
              <MuiLink
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
              >
                GitHub <GitHubIcon sx={{ fontSize: '1rem' }} />
              </MuiLink>
              .
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
