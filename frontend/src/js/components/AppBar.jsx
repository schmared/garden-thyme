import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EmojiNature from '@material-ui/icons/EmojiNature';
import { makeStyles } from '@material-ui/core/styles';
import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  barIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <EmojiNature className={classes.barIcon} />
        <Typography variant="h6" className={classes.title}>
          Garden Thyme
        </Typography>
        <Settings />
      </Toolbar>
    </AppBar>
  );
};
