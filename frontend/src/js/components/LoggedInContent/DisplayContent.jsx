import React from 'react';
import PropTypes from 'prop-types';

const DisplayContent = ({
  className,
  isLoggedIn,
  children,
  loggedOutChildren,
  userIsInitialized,
  requiresUserInitialization,
}) => {
  if (isLoggedIn && (userIsInitialized || !requiresUserInitialization)) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  if (!loggedOutChildren) {
    return null;
  }

  return (<div className={className}>{loggedOutChildren}</div>);
};


DisplayContent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  loggedOutChildren: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  requiresUserInitialization: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.shape({ googleId: PropTypes.string }),
  isLoggedIn: PropTypes.bool.isRequired,
  userIsInitialized: PropTypes.bool.isRequired,
};

DisplayContent.defaultProps = {
  loggedInUser: null,
  loggedOutChildren: null,
};

export default DisplayContent;
