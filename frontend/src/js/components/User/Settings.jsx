import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import config from 'config';
import { useQuery, useMutation, queryCache } from 'react-query';
import LocationMap from './LocationMap';


const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  email: {
    marginBottom: 12,
  },
  settingName: {
    display: 'flex',
    alignItems: 'center',
  },
});

const buffaloCenterish = {
  lat: 42.886431,
  lng: -78.878124,
};

const getSettings = async (_, user) => {
  const { data } = await axios.get(
    `${config.apiBaseRoute}settings?id=${user.googleId}`,
    // { headers: { "Authorization": userAuth }} // Not working in the api yet
  );
  return data;
};

const postSettings = (settings) => {
  console.log(settings);
  return axios.post(`${config.apiBaseRoute}settings`, settings);
};

const Settings = ({ loggedInUser }) => {
  const classes = useStyles();
  const [userLocation, setUserLocation] = useState(buffaloCenterish);
  const [hasChanges, setHasChanges] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaveError, setHasSaveError] = useState(false);

  const { data, error, isFetching } = useQuery(loggedInUser && ['settings', loggedInUser], getSettings);
  const [mutateUser] = useMutation(postSettings, {
    // onMutate: (user) => {
    //   const previousValue = queryCache.getQueryData('settings');
    //   queryCache.setQueryData('settings', (old) => ({
    //     ...old,
    //     items: [...old.items, user],
    //   }));
    //   return previousValue;
    // },
    onError: (_, __, previousValue) => {
      queryCache.setQueryData('settings', previousValue);
      setHasSaveError(true);
    },
    onSettled: () => {
      queryCache.refetchQueries('settings');
      setIsSaving(false);
    },
    onSuccess: () => {
      setHasChanges(false);
    },
  });

  if (isFetching && !isSaving) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>There was an error loading your settings.</div>;
  }
  if (data && data.userId !== 0) {
    setUserLocation(data);
    setHasChanges(false);
  }

  const saveMessage = isSaving ? 'Saving...' : hasSaveError ? 'Error Saving Location.' : 'Saved!'; // eslint-disable-line

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Settings
        </Typography>
        <Typography variant="h5" component="h2" className={classes.settingName}>
          Location
          <Tooltip
            title={
              'We need to know where you are to make our suggestions more accurate. '
              + 'We will never share this information with anyone. '
              + 'The closer you get to your actual location, the better our suggestions can be!'
            }
            fontSize="small"
          >
            <HelpIcon style={{ marginLeft: 5 }} />
          </Tooltip>
        </Typography>
        <LocationMap
          presetLocation={userLocation}
          updateLocation={(l) => {
            setUserLocation(l);
            setHasChanges(true);
          }}
        />
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          disabled={!hasChanges}
          onClick={() => {
            setIsSaving(true);
            mutateUser({
              userId: loggedInUser.googleId,
              latitude: userLocation.lat,
              longitude: userLocation.lng,
            });
          }}
        >
          Save
        </Button>
        <div>
          {saveMessage}
        </div>
      </CardActions>
    </Card>
  );
};

Settings.propTypes = {
  loggedInUser: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = (state) => ({
  loggedInUser: state.settings.user,
});

export default connect(mapStateToProps)(Settings);
