import { purple, grey } from '@mui/material/colors';
import { ThemeMode } from '../lib/interfaces/common';

export const palette = (themeMode: ThemeMode = 'light') => ({
  mode: themeMode,
  common: {
    black: '#000',
    white: '#fff',
  },
  primary: {
    light: purple[500],
    main: purple[700],
    dark: purple[900],
    contrastText: '#fff',
  },
  secondary: {
    light: grey[100],
    main: grey[300],
    dark: grey[500],
    contrastText: '#000',
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
});
