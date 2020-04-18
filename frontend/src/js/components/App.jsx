import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { hot } from 'react-hot-loader/root';
import theme from '../theme';
import AppBar from './AppBar';
import Journal from './Journal';
import Dashboard from './Dashboard';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  mainContent: {
    flexGrow: 1,
  },
  footer: {
    flexGrow: 0,
    padding: theme.spacing(1),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <Dashboard className={classes.mainContent} />
        <div className={classes.footer}>
          &copy; 2020 Team Awesome
        </div>
        <Journal className={classes.fab} />
      </ThemeProvider>
    </div>
  );
};

export default hot(App);
