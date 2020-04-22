import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTransition from './DialogTransition';
import JournalEntry from './JournalEntry';
import api from './api';
import userApi from '../User/api';

const useStyles = makeStyles(() => ({
  paper: {
    height: '90vh',
    width: '100vw',
    top: '5vh',
  },
}));

const JournalDialog = ({
  open,
  cancel,
  loggedInUser,
}) => {
  const classes = useStyles();
  const today = moment().format('YYYY-MM-DD');

  const [entries, updateEntries] = useState([]);
  const [needsSaving, setNeedsSaving] = useState(false);
  const {
    data: actionTypes,
    error: errorFetchingTypes,
    isFetching: isFetchingTypes,
  } = api.useGetActionTypes();
  const {
    data: userSettings,
    error: errorFetchingUser,
    isFetching: isFetchingUser,
  } = userApi.useGetSettings(loggedInUser.googleId);
  const {
    data: dbEntries,
    error: errorFetchingEntries,
    isFetching: isFetchingEntries,
  } = api.useGetEntries(loggedInUser.googleId, today);

  const addEntry = () => {
    updateEntries((e) => [...e, {
      id: 0,
      entryDateTime: today,
      entryType: actionTypes.find((t) => t.value === 'Plant').id,
      quantity: 1,
      longitude: 1,
      latitude: 1,
    }]);
    setNeedsSaving(true);
  };

  let content = <CircularProgress />;
  if (!isFetchingTypes && !isFetchingUser && !isFetchingEntries) {
    const canEdit = !errorFetchingTypes && !needsSaving
      && !errorFetchingUser && !errorFetchingEntries;

    console.log(dbEntries);
    console.log(entries);
    const allEntries = [...dbEntries, ...entries];

    content = (
      <div>
        {allEntries.map((entry) => (
          <JournalEntry
            key={entry.id}
            value={entry}
            types={actionTypes}
            userSettings={userSettings}
            entryDateTime={today}
          />
        ))}
        {canEdit && (
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={addEntry}>
            Add New Entry
          </Button>
        )}
      </div>
    );
  }

  return (
    <Dialog
      open={open}
      classes={classes}
      TransitionComponent={DialogTransition}
      keepMounted
      maxWidth={false}
      onClose={() => cancel()}
      aria-labelledby="journal-dialog-title"
      aria-describedby="journal-dialog-description"
    >
      <DialogTitle id="journal-dialog-title">
        <TextField id="date" label="Log Date" type="date" defaultValue={today} disabled />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="journal-dialog-description">
          Update what you&apos;ve done on the above date
          to keep track and help us build on our data!
        </DialogContentText>
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => cancel()} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

JournalDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  loggedInUser: PropTypes.shape({ googleId: PropTypes.string }).isRequired,
};

const mapStateToProps = (state) => ({
  loggedInUser: state.settings.user,
});

export default connect(mapStateToProps)(JournalDialog);
