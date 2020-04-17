import React from 'react';
import PropTypes from 'prop-types';
import CardList from './CardList';

const Dashboard = ({ className }) => (
  <div className={className}>
    <CardList />
  </div>
);

Dashboard.propTypes = {
  className: PropTypes.string,
};

Dashboard.defaultProps = {
  className: '',
};

export default Dashboard;
