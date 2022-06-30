import { blue, grey } from '@mui/material/colors';
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
      contrastText: '#000',
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
