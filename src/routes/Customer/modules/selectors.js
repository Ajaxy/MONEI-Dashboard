import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {getActiveCustomer} from 'routes/Customers/modules/selectors';

const customerSelector = state => state[stateKey];
export const getCustomer = getActiveCustomer;

export const getIsFetching = createSelector(
  customerSelector,
  customer => customer.isFetching
);
