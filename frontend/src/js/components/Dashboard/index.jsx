import React from 'react';
import CardList from './CardList';
import LoggedInContent from '../LoggedInContent';
import StartingOutInfo from './StartingOutInfo';

const Dashboard = () => (
  <LoggedInContent
    requiresUserInitialization
    loggedOutChildren={<StartingOutInfo />}
  >
    <CardList typeName="Plant" />
    <CardList typeName="Harvest" />
  </LoggedInContent>
);

export default Dashboard;
