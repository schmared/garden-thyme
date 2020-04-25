import React from 'react';
import PropTypes from 'prop-types';
import FlashOn from '@material-ui/icons/FlashOn';
import Grain from '@material-ui/icons/Grain';
import BeachAccess from '@material-ui/icons/BeachAccess';
import AcUnit from '@material-ui/icons/AcUnit';
import WbSunny from '@material-ui/icons/WbSunny';
import Cloud from '@material-ui/icons/Cloud';
import Looks from '@material-ui/icons/Looks';


const Icon = ({ weatherString }) => {
  const lowerWeatherString = weatherString.toLowerCase();

  if (lowerWeatherString === 'thunderstorm') {
    return <FlashOn style={{ fontSize: 80 }} color="primary" />;
  } if (lowerWeatherString === 'drizzle') {
    return <Grain style={{ fontSize: 80 }} color="primary" />;
  } if (lowerWeatherString === 'rain') {
    return <BeachAccess style={{ fontSize: 80 }} color="primary" />;
  } if (lowerWeatherString === 'snow') {
    return <AcUnit style={{ fontSize: 80 }} color="primary" />;
  } if (lowerWeatherString === 'clear') {
    return <WbSunny style={{ fontSize: 80 }} color="primary" />;
  } if (lowerWeatherString.includes('clouds')) {
    return <Cloud style={{ fontSize: 80 }} color="primary" />;
  }
  return <Looks style={{ fontSize: 80 }} color="primary" />;
};

Icon.propTypes = {
  weatherString: PropTypes.string.isRequired,
};

export default Icon;
