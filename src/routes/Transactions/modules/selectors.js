import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {PAGE_LIMIT} from 'lib/constants';

const customersSelector = state => state[stateKey];
const activeTransactionIdSelector = state => state.router.params.customerId;
export const getTransactions = createSelector(
  customersSelector,
  customers => customers.ids.map(id => customers.byId[id]).slice(0, PAGE_LIMIT)
);

export const getTransactionIds = createSelector(
  customersSelector,
  customers => customers.ids
);

export const getTotalAmount = createSelector(
  customersSelector,
  customers => customers.totalAmount
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
