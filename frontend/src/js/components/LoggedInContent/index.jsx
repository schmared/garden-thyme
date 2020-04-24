import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../User/api';
import DisplayContent from './DisplayContent';

const LoggedInContent = ({
  className,
  loggedInUser,
  isLoggedIn,
  children,
  loggedOutChildren,
  requiresUserInitialization,
}) => {
  const { data: settings, error, isFetching } = api.useGetSettings(loggedInUser.googleId);

  const userIsInitialized = !!settings && settings.userId !== '0';

  return (
    <DisplayContent
      className={className}
      isLoggedIn={isLoggedIn && !isFetching && !error}
      userIsInitialized={userIsInitialized}
      requiresUserInitialization={requiresUserInitialization}
      loggedOutChildren={loggedOutChildren}
    >
      {children}
    </DisplayContent>
  );
};


LoggedInContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  loggedOutChildren: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  requiresUserInitialization: PropTypes.bool,
  loggedInUser: PropTypes.shape({ googleId: PropTypes.string }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

LoggedInContent.defaultProps = {
  className: '',
  requiresUserInitialization: false,
  loggedOutChildren: null,
};

const mapStateToProps = (state) => ({
  loggedInUser: state.settings.user,
  isLoggedIn: state.settings.isLoggedIn,
});

export default connect(mapStateToProps)(LoggedInContent);
