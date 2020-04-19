import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LoggedInContent = ({
  className, isLoggedIn, children, loggedOutChildren,
}) => {
  if (isLoggedIn) {
    return <div className={className}>{children}</div>;
  }

  return <div className={className}>{loggedOutChildren}</div>;
};


LoggedInContent.propTypes = {
  className: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  loggedOutChildren: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.settings.isLoggedIn,
});

export default connect(mapStateToProps)(LoggedInContent);
