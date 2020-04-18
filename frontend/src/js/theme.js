import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightGreen,
    secondary: orange,
  },
});

export default responsiveFontSizes(theme);
