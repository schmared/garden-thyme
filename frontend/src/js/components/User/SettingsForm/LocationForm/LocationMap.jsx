import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ChoosableMap from './ChoosableMap';


const LocationMap = ({
  updateLocation,
  loggedInUser,
  defaultLocation,
  mapsKey,
}) => {
  useEffect(() => {
    updateLocation({
      userId: loggedInUser.googleId,
      latitude: defaultLocation.lat,
      longitude: defaultLocation.lng,
      zipCode: '00000-0000', // TODO I need to do this
    });
  }, []);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <ChoosableMap
        apiKey={mapsKey}
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
  defaultLocation: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }).isRequired,
  mapsKey: PropTypes.string.isRequired,
};

export default LocationMap;
