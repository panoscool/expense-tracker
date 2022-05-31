import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red, blue, yellow, green, grey, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      light: grey[100],
      main: grey[300],
      dark: grey[500],
      contrastText: '#333',
    },
    secondary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
      contrastText: '#fff',
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
      contrastText: '#fff',
    },
    info: {
      light: blue.A200,
      main: blue.A400,
      dark: blue.A700,
      contrastText: '#fff',
    },
    success: {
      main: green.A400,
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
  },
});

export default responsiveFontSizes(theme);
