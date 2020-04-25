import React from 'react';
import PropTypes from 'prop-types';
import FlashOn from '@material-ui/icons/FlashOn';
import Grain from '@material-ui/icons/Grain';
import BeachAccess from '@material-ui/icons/BeachAccess';
import AcUnit from '@material-ui/icons/AcUnit';
import WbSunny from '@material-ui/icons/WbSunny';
import Cloud from '@material-ui/icons/Cloud';
import Looks from '@material-ui/icons/Looks';


const Icon = ({ weatherString, small }) => {
  const lowerWeatherString = weatherString.toLowerCase();
  const fontSize = small ? 60 : 80;

  if (lowerWeatherString === 'thunderstorm') {
    return <FlashOn style={{ fontSize }} color="primary" />;
  } if (lowerWeatherString === 'drizzle') {
    return <Grain style={{ fontSize }} color="primary" />;
  } if (lowerWeatherString === 'rain') {
    return <BeachAccess style={{ fontSize }} color="primary" />;
  } if (lowerWeatherString === 'snow') {
    return <AcUnit style={{ fontSize }} color="primary" />;
  } if (lowerWeatherString === 'clear') {
    return <WbSunny style={{ fontSize }} color="primary" />;
  } if (lowerWeatherString.includes('clouds')) {
    return <Cloud style={{ fontSize }} color="primary" />;
  }
  return <Looks style={{ fontSize }} color="primary" />;
};

Icon.propTypes = {
  weatherString: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

Icon.defaultProps = {
  small: false,
};

export default Icon;
