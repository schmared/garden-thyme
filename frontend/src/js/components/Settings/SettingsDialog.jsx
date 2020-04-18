import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const SettingsDialog = ({
  open,
  close,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog
        id="settings-dialog"
        open={open}
        keepMounted
        fullScreen={fullScreen}
        onClose={close}
        aria-labelledby="settings-dialog-title"
        aria-describedby="settings-dialog-description"
      >
        <DialogTitle id="settings-dialog-title">
          Settings
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="user-settings-dialog-description">
            We need your location to determine the best plants for you!
          </DialogContentText>
          <div>Some kind of form goes here!</div>
        </DialogContent>
        <DialogActions>
          <Button
            alt="Close settings dialog"
            onClick={close}
            color="primary"
            className="close-button"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SettingsDialog;
