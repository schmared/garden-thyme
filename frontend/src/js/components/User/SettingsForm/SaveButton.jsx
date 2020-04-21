import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../api';

const useStyles = makeStyles({
  textWithIcon: {
    display: 'flex',
    alignItems: 'center',
  },
});


const SaveButton = ({ userLocation, hasChanges, setHasChanges }) => {
  const classes = useStyles();

  // if we split out the form maybe the map won't flash and change center??
  const [mutateUser, { status }] = api.usePostSettings();

  const isLoading = status === 'loading';

  return (
    <CardActions>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          disabled={!hasChanges}
          onClick={() => {
            mutateUser(userLocation);
            setHasChanges(false);
          }}
        >
          Save
        </Button>
      )}
      {status === 'success' && <DoneIcon color="primary" />}
      {status === 'error' && (
        <div className={classes.textWithIcon}>
          <ErrorIcon color="error" />
          There was an error saving your location
        </div>
      )}
    </CardActions>
  );
};

SaveButton.propTypes = {
  userLocation: PropTypes.shape({
    googleId: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired, // eslint-disable-line
  hasChanges: PropTypes.bool.isRequired,
  setHasChanges: PropTypes.func.isRequired,
};

export default SaveButton;
