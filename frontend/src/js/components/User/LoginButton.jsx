import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import api from './api';


const LoginButton = ({ setUserLoggedIn, isLoggedIn, children: child }) => {
  const { data: keys, error, isFetching } = api.useGetKeys();

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Initialization Error</div>;
  }

  const googleResponse = (response) => setUserLoggedIn(response);

  const googleError = (e) => console.warn(e); // eslint-disable-line no-console

  if (isLoggedIn) {
    return null;
  }

  return (
    <GoogleLogin
      clientId={keys.clientId}
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

LoginButton.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
