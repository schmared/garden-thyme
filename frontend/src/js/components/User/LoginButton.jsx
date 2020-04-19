import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';


const Settings = ({ setUserLoggedIn, isLoggedIn, children: child }) => {
  const googleResponse = (response) => setUserLoggedIn(response);

  const googleError = (error) => console.warn(error); // eslint-disable-line no-console

  if (isLoggedIn) {
    return null;
  }

  // TODO move clientId to config somewhere
  return (
    <GoogleLogin
      clientId="190581999051-9d8pjkd18pcgd1o56i96s15u03el7ne7.apps.googleusercontent.com"
      onSuccess={googleResponse}
      onFailure={googleError}
      isSignedIn
      cookiePolicy="single_host_origin"
      render={(renderProps) => React.cloneElement(child, {
        onClick: renderProps.onClick,
        disabled: renderProps.disabled,
      })}
    />
  );
};

Settings.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setUserLoggedIn: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.settings.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setUserLoggedIn: (value) => dispatch({ type: 'SET_USER', value }),
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
