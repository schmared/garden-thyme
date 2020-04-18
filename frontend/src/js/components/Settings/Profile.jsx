import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GoogleLogout } from 'react-google-login';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  email: {
    marginBottom: 12,
  },
});

const Profile = ({ user, logOut }) => {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Logged in as
        </Typography>
        <Typography variant="h5" component="h2">
          {user.name}
        </Typography>
        <Typography className={classes.email} color="textSecondary">
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        <GoogleLogout
          onLogoutSuccess={logOut}
          render={(renderProps) => (
            <Button size="small" onClick={renderProps.onClick}>Log Out</Button>
          )}
        />
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.settings.user,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: (value) => dispatch({ type: 'LOG_OUT', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
