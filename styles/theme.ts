import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red, blue, yellow, green, grey, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: grey[900],
    },
    secondary: {
      main: purple[800],
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: yellow.A700,
    },
    info: {
      main: blue.A100,
    },
    success: {
      main: green.A400,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});

export default responsiveFontSizes(theme);
