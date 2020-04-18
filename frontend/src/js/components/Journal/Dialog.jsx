import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogTransition from './DialogTransition';

const JournalDialog = ({
  open,
  cancel,
}) => {
  const addJournalEntry = () => {
    console.log('do something?'); // eslint-disable-line no-console
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={DialogTransition}
      keepMounted
      fullScreen
      onClose={() => cancel()}
      aria-labelledby="journal-dialog-title"
      aria-describedby="journal-dialog-description"
    >
      <DialogTitle id="journal-dialog-title">What Did You Do Today?</DialogTitle>
      <DialogContent>
        <DialogContentText id="journal-dialog-description">
          Planted | Harvested | Started Seeds | Something Else
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancel()} color="secondary">Cancel</Button>
        <Button onClick={addJournalEntry} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

JournalDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default JournalDialog;
