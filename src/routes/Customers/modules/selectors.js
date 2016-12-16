import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const customersSelector = state => state[stateKey];

export const getCustomers = createSelector(
  customersSelector,
  customers => customers.ids.map(id => customers.byId[id])
);

export const getCustomerIds = createSelector(
  customersSelector,
  customers => customers.ids
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

