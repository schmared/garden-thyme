import React from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Profile from './Profile';
import SettingsForm from './SettingsForm';

// TODO this is weirdly showing the logged-out background on transition
const useStyles = makeStyles(() => {
  const drawerWidth = ({ fullWidth }) => (fullWidth ? '100vw' : 450);

  return {
    root: {
      display: 'flex',
    },
    // appBar: {
    // This is causing issues in the Journal modal. Leaving it behind the app bar for now.
    //   zIndex: theme.zIndex.drawer + 1,
    // },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
  };
});

const UserDrawer = ({
  open,
  close,
}) => {
  const theme = useTheme();
  const fullWidth = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles({ fullWidth });

  return (
    <SwipeableDrawer
      anchor="right"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      open={open}
      onOpen={() => {}}
      onClose={close}
      disableBackdropTransition
      disableDiscovery
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <Profile />
        <SettingsForm />
      </div>
    </SwipeableDrawer>
  );
};

UserDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default UserDrawer;
