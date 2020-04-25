import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EmojiNature from '@material-ui/icons/EmojiNature';
import { makeStyles } from '@material-ui/core/styles';
import User from './User';

const useStyles = makeStyles((theme) => ({
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
    <AppBar position="sticky">
      <Toolbar>
        <EmojiNature className={classes.barIcon} />
        <Typography variant="h5" className={classes.title}>
          Garden Thyme
        </Typography>
        <User />
      </Toolbar>
    </AppBar>
  );
};
