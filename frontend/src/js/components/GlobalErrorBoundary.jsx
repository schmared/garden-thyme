import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EmojiNature from '@material-ui/icons/EmojiNature';
import PropTypes from 'prop-types';

// General error boundary for now, this should be more specific later
class GeneralErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn(error); // eslint-disable-line no-console
  }

  render() {
    const { hasError } = this.state;
    const { children, classes } = this.props;

    if (hasError) {
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <EmojiNature />
              <Typography variant="h6">
                Garden Thyme
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.mainContent}>
            <div style={{ padding: 10 }}>
              There was an error. Please refresh the page and try again.
            </div>
          </div>
          <div className={classes.footer}>
            &copy; 2020 Team Awesome
          </div>
        </div>
      );
    }

    return children;
  }
}

/* eslint-disable react/forbid-prop-types */
GeneralErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default GeneralErrorBoundary;
