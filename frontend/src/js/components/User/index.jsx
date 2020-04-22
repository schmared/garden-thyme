import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserDrawer from './UserDrawer';
import LoginButton from './LoginButton';


const Settings = ({
  isLoggedIn, user, isOpen, setIsOpen,
}) => {
  if (isLoggedIn) {
    return (
      <div id="user-settings">
        <IconButton alt="Edit User Settings" onClick={() => setIsOpen(!isOpen)}>
          <Avatar alt={`Logged in as ${user.name}`} src={user.imageUrl} />
        </IconButton>
        <UserDrawer open={isOpen} close={() => setIsOpen(false)} />
      </div>
    );
  }

  return (
    <div id="user-settings">
      <LoginButton>
        <Button id="login-button" alt="Log in with Google" startIcon={<AccountCircle />}>
          Log In
        </Button>
      </LoginButton>
    </div>
  );
};

Settings.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.settings.user,
  isLoggedIn: state.settings.isLoggedIn,
  isOpen: state.modals.userSettingsOpen,
});

const mapDispatchToProps = (dispatch) => ({
  setIsOpen: (value) => dispatch({ type: value ? 'OPEN_SETTINGS' : 'CLOSE_MODALS' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
