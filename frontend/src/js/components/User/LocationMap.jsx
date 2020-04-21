import React from 'react';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from './api';
import ChoosableMap from './ChoosableMap';

const buffaloCenterish = {
  lat: 42.886431,
  lng: -78.878124,
};

const LocationMap = ({
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
    <div style={{ height: '400px', width: '100%' }}>
      <ChoosableMap
        apiKey={keys.mapsKey}
        center={defaultLocation}
        onChange={(newLocation) => {
          let zips = [];
          if (newLocation.places.length) {
            zips = newLocation.places[0].address_components
              .filter((p) => p.types[0] === 'postal_code'
                 || p.types[0] === 'postal_code_suffix')
              .map((p) => p.long_name);
          }

          updateLocation({
            userId: loggedInUser.googleId,
            latitude: newLocation.position.lat,
            longitude: newLocation.position.lng,
            zipCode: `${zips[0] ? zips[0] : '0000'}-${zips[1] ? zips[1] : '0000'}`,
          });
        }}
      />
    </div>
  );
};

LocationMap.propTypes = {
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

LocationMap.defaultProps = {
  coords: { latitude: false, longitude: false },
};

export default geolocated({
  positionOptions: { enableHighAccuracy: true },
  userDecisionTimeout: 10000,
})(LocationMap);
