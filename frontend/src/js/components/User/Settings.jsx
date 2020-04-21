import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import LocationMap from './LocationMap';
import LocationFormSave from './LocationFormSave';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  email: {
    marginBottom: 12,
  },
  textWithIcon: {
    display: 'flex',
    alignItems: 'center',
  },
});

const Settings = ({ loggedInUser }) => {
  const classes = useStyles();
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [hasChanges, setHasChanges] = useState(false);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Settings
        </Typography>
        <Typography variant="h5" component="h2" className={classes.textWithIcon}>
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
          loggedInUser={loggedInUser}
          updateLocation={(l) => {
            setUserLocation(l);
            setHasChanges(true);
          }}
        />
      </CardContent>
      <LocationFormSave
        userLocation={userLocation}
        hasChanges={hasChanges}
        setHasChanges={() => setHasChanges(false)}
      />
    </Card>
  );
};

Settings.propTypes = {
  loggedInUser: PropTypes.shape({
    googleId: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  loggedInUser: state.settings.user,
});

export default connect(mapStateToProps)(Settings);
