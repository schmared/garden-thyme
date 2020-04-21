import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocationPicker from './LocationPicker';
import GoogleMapLoader from '../../../../loaders/google_map_loader';

const ChoosableMap = ({ apiKey, center, onChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [google, setGoogle] = useState({});

  // This should all become part of the LocationPicker fork
  // But the library itself really wanted the loading to be part of an HOC
  // we wouldn't have the api key if we did it that way
  useEffect(() => {
    async function loadGoogleMapsScript() {
      setGoogle(await GoogleMapLoader({ key: apiKey }, 'geometry,drawing,places'));
      setIsLoading(false);
    }
    loadGoogleMapsScript();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <LocationPicker
      google={google}
      containerElement={<div style={{ height: '400px', width: '100%' }} />}
      mapElement={<div style={{ height: '400px' }} />}
      defaultPosition={center}
      onChange={onChange}
    />
  );
};

ChoosableMap.propTypes = {
  apiKey: PropTypes.string.isRequired,
  center: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ChoosableMap;
