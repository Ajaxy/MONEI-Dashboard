import React, {Component, PropTypes} from 'react';
import Router from 'react-router/lib/Router';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import useScroll from 'react-router-scroll/lib/useScroll';
import {Provider} from 'react-redux';

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired
  };

  render() {
    const {history, routes, routerKey, store} = this.props;

    return (
      <Provider store={store}>
        <Router
          history={history}
          children={routes}
          key={routerKey}
          render={applyRouterMiddleware(useScroll())} />
      </Provider>
    );
  }
}

export default AppContainer;
