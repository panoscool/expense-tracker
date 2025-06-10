import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Fade,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppContext } from 'context/app-context';
import React, { useEffect, useMemo } from 'react';
import apps from '../lib/data/apps.json';

const AnimatedCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  minHeight: 300,
  background: theme.palette.mode === 'dark' ? 'rgba(40,40,60,0.85)' : 'rgba(255,255,255,0.93)',
  boxShadow: theme.shadows[3],
  transition: 'all .3s cubic-bezier(.4,2,.6,1)',
  position: 'relative',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-6px) scale(1.012)',
    boxShadow: theme.shadows[7],
  },
}));

const AppIcon = styled(Avatar)(({ theme }) => ({
  width: 72,
  height: 72,
  fontSize: 36,
  padding: 10,
  background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(238,90,36,0.3))',
  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  marginBottom: theme.spacing(2),
}));

type VersionButtonProps = {
  current?: boolean;
  target?: string;
};

const VersionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'current',
})<VersionButtonProps>(({ theme, current }) => ({
  borderRadius: 20,
  fontWeight: 600,
  fontSize: '0.95rem',
  padding: '6px 18px',
  color: '#fff',
  background: current ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'linear-gradient(135deg, #3498db, #2980b9)',
  boxShadow: current ? '0 4px 15px rgba(231, 76, 60, 0.19)' : '0 4px 15px rgba(52,152,219,0.18)',
  '&:hover': {
    background: current ? 'linear-gradient(135deg, #c0392b, #a93226)' : 'linear-gradient(135deg, #2980b9, #1abc9c)',
    boxShadow: current ? '0 6px 20px rgba(231, 76, 60, 0.24)' : '0 6px 20px rgba(52,152,219,0.22)',
  },
}));

type SingleVersionBtnProps = {
  target?: string;
};

const SingleVersionBtn = styled(Button)<SingleVersionBtnProps>(() => ({
  borderRadius: 20,
  fontWeight: 700,
  fontSize: '1.05rem',
  padding: '8px 20px',
  color: '#fff',
  background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
  boxShadow: '0 6px 20px rgba(46,204,113,0.23)',
  '&:hover': {
    background: 'linear-gradient(135deg, #27ae60, #219a52)',
    boxShadow: '0 8px 25px rgba(46,204,113,0.30)',
  },
}));

export default function AppsShowcase() {
  const { themeMode, setThemeMode } = useAppContext();

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [setThemeMode],
  );

  // Optional: Parallax background effect
  useEffect(() => {
    const setBg = (x = 0.5, y = 0.5) => {
      document.body.style.background =
        `radial-gradient(circle at ${x * 100}% ${y * 100}%, ` +
        (themeMode === 'dark'
          ? 'rgba(40, 48, 78, 0.88) 0%, rgba(118, 75, 162, 0.84) 100%)'
          : 'rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)') +
        `,linear-gradient(135deg, #667eea 0%, #764ba2 100%)`;
    };

    // Set initial background (center)
    setBg();

    // Update on mouse move
    const handler = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      setBg(mouseX, mouseY);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [themeMode]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 3, md: 6 },
        background: 'none',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 7 },
            animation: 'fadeInDown 0.85s',
            '@keyframes fadeInDown': {
              from: { opacity: 0, transform: 'translateY(-30px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  textShadow: '2px 2px 8px rgba(0,0,0,0.22)',
                }}
              >
                PanosCool
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                Explore a variety of applications
              </Typography>
            </Box>
            <Tooltip title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {themeMode === 'dark' ? (
                  <Brightness7Icon sx={{ color: '#fff' }} />
                ) : (
                  <Brightness4Icon sx={{ color: '#ffd600' }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {apps.map((app, idx) => (
            <Grid key={app.id} item xs={12} sm={6} md={4} alignItems="stretch">
              <Fade in timeout={500 + idx * 70}>
                <AnimatedCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ pb: 0, flexGrow: 1 }}>
                    <AppIcon src={app.icon}>{app.icon}</AppIcon>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: themeMode === 'dark' ? '#e0e6f3' : '#2c3e50',
                      }}
                    >
                      {app.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '1.05rem',
                        color: themeMode === 'dark' ? '#b0b7c3' : '#7f8c8d',
                        mb: 2,
                        minHeight: 64,
                      }}
                    >
                      {app.description}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      p: 2,
                      pt: 0,
                    }}
                  >
                    {app.versions.length === 1 ? (
                      <SingleVersionBtn href={app.versions[0].url} target="_blank" rel="noopener" fullWidth>
                        {app.versions[0].name}
                      </SingleVersionBtn>
                    ) : (
                      <Box sx={{ width: '100%', mt: 1 }}>
                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          Available Versions:
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                          }}
                        >
                          {app.versions.map((ver, i) => (
                            <VersionButton
                              key={i}
                              href={ver.url}
                              current={ver.isCurrent}
                              target="_blank"
                              rel="noopener"
                            >
                              {ver.name}
                            </VersionButton>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardActions>
                </AnimatedCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
