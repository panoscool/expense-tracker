import { teal, grey } from '@mui/material/colors';
import { ThemeMode } from '../lib/interfaces/common';

/** @returns PaletteOptions from '@mui/material' */
export const palette = (themeMode: ThemeMode = 'light') => ({
  mode: themeMode,
  common: {
    black: '#000',
    white: '#fff',
  },
  primary: {
    light: teal[500],
    main: teal[700],
    dark: teal[900],
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
