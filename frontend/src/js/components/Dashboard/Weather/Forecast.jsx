import React from 'react';
import PropTypes from 'prop-types';
// import Icon from './Icon';

// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
// import moment from 'moment';

const Forecast = ({ day }) => {
  console.log(day); // eslint-disable-line

  const date = moment(day.sunrise);
  console.log(date.format('MMMM Do YYYY h:mm'));

  return (
    <Grid item xs={1}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6">
            Buffalo, NY
          </Typography>
          <Typography variant="h4">
            99
            &deg;F
          </Typography>
          <Typography variant="body2" color="textSecondary">
            words
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

Forecast.propTypes = {
  day: PropTypes.shape({ sunrise: PropTypes.number }).isRequired,
};

export default Forecast;
