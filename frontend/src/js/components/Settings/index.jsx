import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GoogleLogin from 'react-google-login';
import SettingsDialog from './SettingsDialog';


const Settings = ({ setUserLoggedIn, isLoggedIn, user }) => {
  const [open, setOpen] = useState(false);

  const googleResponse = (response) => setUserLoggedIn(response);

  if (isLoggedIn) {
    return (
      <div id="user-settings">
        <IconButton alt="Edit User Settings" onClick={() => setOpen(!open)}>
          <Avatar alt={`Logged in as ${user.name}`} src={user.imageUrl} />
        </IconButton>
        <SettingsDialog open={open} close={() => setOpen(false)} />
      </div>
    );
  }

  return (
    <div id="user-settings">
      <GoogleLogin
        clientId="190581999051-9d8pjkd18pcgd1o56i96s15u03el7ne7.apps.googleusercontent.com"
        onSuccess={googleResponse}
        isSignedIn
        cookiePolicy="single_host_origin"
        render={(renderProps) => (
          <Button
            id="login-button"
            alt="Log in with Google"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<AccountCircle />}
          >
            Log In
          </Button>
        )}
      />
    </div>
  );
};

Settings.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setUserLoggedIn: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.settings.user,
  isLoggedIn: state.settings.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setUserLoggedIn: (value) => dispatch({ type: 'SET_USER', value }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
