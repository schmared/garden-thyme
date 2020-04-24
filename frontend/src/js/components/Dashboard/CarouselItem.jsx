import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    width: '90%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  avatar: {
    backgroundColor: 'blue',
  },
}));

const CarouselItem = ({ name, growZone, imageUrl }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia image={imageUrl} title={name} className={classes.media} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            It&apos;s a great time to plant
            {' '}
            {name}
            {' '}
            in Zone
            {' '}
            {growZone}
            .
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button disabled title="This isn't hooked up yet!">
          Add to Journal
        </Button>
      </CardActions>
    </Card>
  );
};

CarouselItem.propTypes = {
  name: PropTypes.string.isRequired,
  growZone: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CarouselItem;
