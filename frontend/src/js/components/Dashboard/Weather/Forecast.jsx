import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Icon from './Icon';

const Forecast = ({ day, index }) => {
  const today = moment();
  const dayOfForecast = today.add(index + 1, 'days');
  const weekday = dayOfForecast.format('dddd');

  return (
    <Grid item sm={1}>
      <Card>
        <CardContent>
          <Typography variant="body2">
            {weekday}
          </Typography>
          <Typography variant="h5">
            <Icon weatherString={day.weather[0].main} small />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {day.weather[0].main}
            <br />
            <br />
            <b>High:</b>
            <br />
            {day.temp.max}
            <br />
            <b>Low:</b>
            <br />
            {day.temp.min}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

Forecast.propTypes = {
  index: PropTypes.number.isRequired,
  day: PropTypes.shape({
    sunrise: PropTypes.number,
    weather: PropTypes.array, // eslint-disable-line
    temp: PropTypes.shape({ max: PropTypes.number, min: PropTypes.number }),
  }).isRequired,
};

export default Forecast;
