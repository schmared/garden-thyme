import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  p: {
    marginTop: theme.spacing(1),
  },
}));

const StartingOutInfo = () => {
  const classes = useStyles();

  return (
    <Container>
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Typography variant="h4" component="h3">
            Setup Required
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary" className={classes.p}>
            We need to know where your garden is to give you suggestions based on your location.
          </Typography>
          <Typography variant="body2" component="p" className={classes.p}>
            Please click your avatar in the upper right corner of the screen to
            access your settings.
            Then save your location, which should be determined automatically if you allow access
            in the browser.
          </Typography>
          <Typography variant="body2" component="p" className={classes.p}>
            Once your location is set, you can create journal entries and see suggestions
            for what you should do in your garden today!
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StartingOutInfo;
