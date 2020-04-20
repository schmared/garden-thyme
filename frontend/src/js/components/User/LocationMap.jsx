import React from 'react';
import PropTypes from 'prop-types';
import LocationPicker from 'react-location-picker';
import { geolocated } from 'react-geolocated';
import CircularProgress from '@material-ui/core/CircularProgress';


const LocationMap = ({
  presetLocation,
  updateLocation,
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
}) => {
  // Pass in location from api

  // Detect user's location or default to the middle of Buffalo
  let defaultLocation = presetLocation;
  if (isGeolocationAvailable && isGeolocationEnabled) {
    if (!coords || !coords.latitude) {
      return <CircularProgress />;
    }
    defaultLocation = { lat: coords.latitude, lng: coords.longitude };
  }

  return (
    <div>
      <LocationPicker
        containerElement={<div style={{ height: '400px', width: '100%' }} />}
        mapElement={<div style={{ height: '400px' }} />}
        defaultPosition={defaultLocation}
        zoom={11}
        onChange={({ position }) => updateLocation(position)}
      />
    </div>
  );
};

LocationMap.propTypes = {
  presetLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  updateLocation: PropTypes.func.isRequired,
  // From the geolocation in the browser:
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
