/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import App from './components/App';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: '5aad3d54-5866-4bee-8842-8a3fc242ccb0',
  },
});
appInsights.loadAppInsights();
appInsights.trackPageView();

ReactDOM.render(<App />, document.getElementById('app'));
