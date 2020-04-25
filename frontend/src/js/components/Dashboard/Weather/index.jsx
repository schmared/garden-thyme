import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import api from './api';
import Icon from './Icon';
import Forecast from './Forecast';

const useStyles = makeStyles(() => ({
  left: {
    width: '33%',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  right: {
    width: '60%',
    display: 'inline-block',
    verticalAlign: 'top',
  },
}));

const Weather = () => {
  const classes = useStyles();

  // TODO use user's location
  const { data: now, error, isFetching } = api.useGetWeather('Buffalo');
  const { data: forecast, error: forecastError, isFetching: isFetchingForecast } = api.useGetForecast('Buffalo');

  if (error || isFetching || forecastError || isFetchingForecast) {
    return null;
  }

  const sunset = moment(now.sys.sunset * 1000).format('h:mm a');
  const sunrise = moment(now.sys.sunrise * 1000).format('h:mm a');


  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item sm={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Buffalo, NY
              </Typography>
              <div className={classes.left}>
                <Icon weatherString={now.weather[0].main} />
              </div>
              <div className={classes.right}>
                <Typography variant="h2" color="primary">
                  {now.main.temp}
                  &deg;F
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {now.weather[0].description}
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary" style={{ marginTop: 5 }}>
                <span className={classes.left}>
                  <b>High:</b>
                  {' '}
                  {now.main.temp_max}
                  &deg;F
                </span>
                <span className={classes.right}>
                  <b>Low:</b>
                  {' '}
                  {now.main.temp_min}
                  &deg;F
                </span>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <span className={classes.left}>
                  <b>Wind:</b>
                  {' '}
                  {now.wind.speed}
                </span>
                <span className={classes.right}>
                  <b>Humidity:</b>
                  {' '}
                  {now.main.humidity}
                </span>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <span className={classes.left}>
                  <b>Sunrise:</b>
                  {' '}
                  {sunrise}
                </span>
                <span className={classes.right}>
                  <b>Sunset:</b>
                  {' '}
                  {sunset}
                </span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {forecast.list.map((day, idx) => (<Forecast key={day.dt} index={idx} day={day} />))}
      </Grid>
    </Container>
  );
};

export default Weather;
