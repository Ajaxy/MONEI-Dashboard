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

export const getPage = createSelector(
  customersSelector,
  customers => customers.page
);

export const getIsLastPage = createSelector(
  getPage,
  page => !page.nextPage
);
