import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const customersSelector = state => state[stateKey];
const activeCustomerIdSelector = state => state.route.params.customerId;

export const getCustomers = createSelector(
  customersSelector,
  customers => customers.ids.map(id => customers.byId[id])
);

export const getActiveCustomer = createSelector(
  customersSelector,
  activeCustomerIdSelector,
  (customers, customerId) => customers.byId[customerId] || {}
);

export const getIsFetching = createSelector(
  customersSelector,
  customers => customers.isFetching
);

export const getQueryParams = createSelector(
  customersSelector,
  customers => customers.queryParams
);

export const getIsFirstPage = createSelector(
  getQueryParams,
  pages => !pages.prevPage
);

export const getIsLastPage = createSelector(
  getQueryParams,
  pages => !pages.nextPage
);

