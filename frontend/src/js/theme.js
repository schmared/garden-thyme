import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import orange from '@material-ui/core/colors/orange';

const decorativeFont = "'Lobster', sans-serif";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightGreen,
    secondary: orange,
  },
  typography: {
    h2: {
      fontFamily: decorativeFont,
    },
    h4: {
      fontFamily: decorativeFont,
    },
  },
});

export default responsiveFontSizes(theme);
