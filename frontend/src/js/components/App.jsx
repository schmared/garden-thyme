import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import theme from '../theme';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import AppBar from './AppBar';
import Journal from './Journal';
import Dashboard from './Dashboard';
import configureStore from '../configure-store';
import '../../css/App.css';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  mainContent: {
    flexGrow: 1,
    overflow: 'auto',
  },
  footer: {
    flexGrow: 0,
    padding: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalErrorBoundary classes={classes}>
        <div className={classes.root}>
          <Provider store={configureStore()}>
            <AppBar />
            <Dashboard className={classes.mainContent} />
            <div className={classes.footer}>
              &copy; 2020 Team Awesome
            </div>
            <Journal className={classes.fab} />
          </Provider>
        </div>
      </GlobalErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
