import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import withScroll from 'scroll-behavior';
import {syncParams} from 'react-router-redux-params';
import * as api from 'lib/api';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

// ========================================================
// Store and History Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState, browserHistory);
const history = syncHistoryWithStore(withScroll(browserHistory), store);

// ========================================================
// Track url changes
// ========================================================
history.listen(location => {
  window.Intercom('update');
  if (window.ga) {
    window.ga('set', 'page', location.pathname);
    window.ga('send', 'pageview');
  }
});

// ========================================================
// Routing for development stage
// ========================================================
if (__STAGE__ === 'development' && location.hash && !location.hash.includes('access_token')) {
  history.push(location.hash.substring(1));
}

// ========================================================
// Setup api interceptors
// ========================================================
api.addInterceptors(store);

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension();
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(store);
  syncParams(store, routes, history);
  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      key={routerKey}
    />,
    MOUNT_NODE
  );
};

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react').default;
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };
  render = () => {
    try {
      renderApp(Math.random());
    } catch (error) {
      renderError(error);
    }
  };
  module.hot.accept(['./routes/index'], () => render());
}

// ========================================================
// Go!
// ========================================================
render();
