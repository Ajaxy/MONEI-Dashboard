import React from 'react';
import ReactDOM from 'react-dom';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import {createHistory, useBeforeUnload} from 'history';
import withScroll from 'scroll-behavior';
import * as api from 'lib/api';
import {syncParams} from 'react-router-redux-params';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// ========================================================
// Author info
// ========================================================
window.author = 'Ranier Montalbo, https://github.com/montzkie18';

// ========================================================
// Browser History Setup
// ========================================================
export const history = withScroll(
  useRouterHistory(useBeforeUnload(createHistory))()
);

// ========================================================
// Store and History Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState, history);

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
      routerKey={routerKey}
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
