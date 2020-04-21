import React from 'react';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from './api';
import LocationMap from './LocationMap';

const buffaloCenterish = {
  lat: 42.886431,
  lng: -78.878124,
};

const UserLocation = ({
  updateLocation,
  loggedInUser,
  isGeolocationAvailable = false,
  isGeolocationEnabled = false,
  coords = false,
}) => {
  let defaultLocation = buffaloCenterish;

  // Get saved user's location
  const { data: settings, error, isFetching } = api.useGetSettings(loggedInUser.googleId);
  const { data: keys, error: keysError, isFetching: isFetchingKeys } = api.useGetKeys();

  if (isFetching || isFetchingKeys) {
    return <CircularProgress />;
  }
  if (error || keysError) {
    return <div>There was an error loading your settings.</div>;
  }

  if (settings && settings.userId !== '0') {
    defaultLocation = { lat: settings.latitude, lng: settings.longitude };
  // Detect user's location or default to the middle of Buffalo
  } else if (isGeolocationAvailable && isGeolocationEnabled) {
    if (!coords || !coords.latitude) {
      return <CircularProgress />;
    }
    defaultLocation = { lat: coords.latitude, lng: coords.longitude };
  }

  return (
    <LocationMap
      updateLocation={updateLocation}
      loggedInUser={loggedInUser}
      defaultLocation={defaultLocation}
      mapsKey={keys.mapsKey}
    />
  );
};

UserLocation.propTypes = {
  loggedInUser: PropTypes.shape({ googleId: PropTypes.string }).isRequired,
  updateLocation: PropTypes.func.isRequired,
  // From the geolocation in the browser (geolocated HOC):
  isGeolocationAvailable: PropTypes.bool.isRequired,
  isGeolocationEnabled: PropTypes.bool.isRequired,
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

UserLocation.defaultProps = {
  coords: { latitude: false, longitude: false },
};

export default geolocated({
  positionOptions: { enableHighAccuracy: true },
  userDecisionTimeout: 10000,
})(UserLocation);
