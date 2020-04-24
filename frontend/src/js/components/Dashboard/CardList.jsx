import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Carousel from '@brainhubeu/react-carousel';
import config from 'config';
import CarouselItem from './CarouselItem';
import api from './api';
import '@brainhubeu/react-carousel/lib/style.css';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const CardList = ({ typeName, loggedInUser }) => {
  const classes = useStyles();
  const { data, error, isFetching } = api.useGetSuggestions(loggedInUser.googleId, typeName);

  let content = '';

  if (isFetching) {
    content = <CircularProgress />;
  } else if (error) {
    content = (
      <div className={classes.root}>
        There was an error loading suggestions for things to
        {' '}
        {typeName}
        {' '}
        this week.
      </div>
    );
  } else {
    content = (
      <Carousel
        arrows
        slidesPerPage={3}
        arrowLeft={<ChevronLeft />}
        arrowLeftDisabled={<ChevronLeft color="disabled" />}
        arrowRight={<ChevronRight />}
        arrowRightDisabled={<ChevronRight color="disabled" />}
        addArrowClickHandler
        breakpoints={{
          640: {
            slidesPerPage: 1,
            arrows: false,
          },
          900: {
            slidesPerPage: 2,
            arrows: false,
          },
        }}
      >
        {data.map(({ plantId, growZone, uri }) => (
          <CarouselItem
            key={plantId}
            name={plantId}
            growZone={growZone}
            imageUrl={`${config.apiBaseRoute}${uri}`}
          />
        ))}
      </Carousel>
    );
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="h3">
        Things you should
        {' '}
        <b>{typeName}</b>
        {' '}
        this week:
      </Typography>
      {content}
    </Container>
  );
};

CardList.propTypes = {
  typeName: PropTypes.string.isRequired,
  loggedInUser: PropTypes.shape({ googleId: PropTypes.string }).isRequired,
};


const mapStateToProps = (state) => ({
  loggedInUser: state.settings.user,
});

export default connect(mapStateToProps)(CardList);
