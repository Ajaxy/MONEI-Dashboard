import {injectReducer} from 'store/reducers';
import Customer from './containers/CustomerContainer';
import OverviewRoute from './routes/Overview';
import TransactionsRoute from './routes/Transactions';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/customers/:customerId',
    indexRoute: OverviewRoute,
    component: RequireAuth(Customer),
    childRoutes: [
      TransactionsRoute(store)
    ]
  };
};
