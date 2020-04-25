import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardList from './CardList';
import StartingOutInfo from './StartingOutInfo';
import Info from '../Info';
import Weather from './Weather';
import api from '../User/api';


const Dashboard = ({
  className, isLoggedIn, loggedInUser, loginLoading,
}) => {
  const { data: settings, error, isFetching } = api.useGetSettings(loggedInUser.googleId);

  if (isFetching || loginLoading) {
    return (
      <div style={{ margin: '70px 0 70px', textAlign: 'center' }}>
        <CircularProgress size="25vh" />
      </div>
    );
  }

  if (!isLoggedIn || error) {
    return <Info />;
  }

  const userIsInitialized = !!settings && settings.userId !== '0';

  if (!userIsInitialized) {
    return <StartingOutInfo />;
  }

  return (
    <div className={className}>
      <CardList typeName="Plant" />
      <CardList typeName="Harvest" />
      <Weather />
    </div>
  );
};

Dashboard.propTypes = {
  className: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.shape({ googleId: PropTypes.string }).isRequired,
  loginLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loggedInUser: state.settings.user,
  isLoggedIn: state.settings.isLoggedIn,
  loginLoading: state.settings.loginLoading,
});

export default connect(mapStateToProps)(Dashboard);
