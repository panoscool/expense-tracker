import { blue, green, grey, red, yellow } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      light: blue[500],
      main: blue[700],
      dark: blue[900],
      contrastText: '#fff',
    },
    secondary: {
      light: grey[100],
      main: grey[300],
      dark: grey[500],
      contrastText: '#333',
    },
    error: {
      light: red.A200,
      main: red.A400,
      dark: red.A700,
      contrastText: '#fff',
    },
    warning: {
      light: yellow.A200,
      main: yellow.A400,
      dark: yellow.A700,
      contrastText: '#333',
    },
    info: {
      light: grey.A200,
      main: grey.A400,
      dark: grey.A700,
      contrastText: '#333',
    },
    success: {
      light: green.A200,
      main: green.A400,
      dark: green.A700,
      contrastText: '#333',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant !== 'text' && {
            borderRadius: '20px',
          }),
        }),
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.severity === 'info' && {
            color: theme.palette.getContrastText(theme.palette.info.main),
          }),
          ...(ownerState.severity === 'warning' && {
            color: theme.palette.getContrastText(theme.palette.warning.main),
          }),
          ...(ownerState.severity === 'error' && {
            color: theme.palette.getContrastText(theme.palette.error.main),
          }),
          ...(ownerState.severity === 'success' && {
            color: theme.palette.getContrastText(theme.palette.success.main),
          }),
        }),
      },
    },
  },
});

export default responsiveFontSizes(theme);
