import React from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './Profile';

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
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
}));

const SettingsDrawer = ({
  open,
  close,
}) => {
  const classes = useStyles();

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
      </div>
    </SwipeableDrawer>
  );
};

SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SettingsDrawer;
