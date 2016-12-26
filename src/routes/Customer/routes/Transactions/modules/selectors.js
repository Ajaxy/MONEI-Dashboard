import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {getViewedTransactionId} from 'routes/Transactions/modules/selectors';

const transactionsSelector = state => state[stateKey];
export const getTransactions = createSelector(
  transactionsSelector,
  transactions => transactions.ids.map(id => transactions.byId[id])
);

export const getIsFetching = createSelector(
  transactionsSelector,
  transactions => transactions.isFetching
);

export const getPage = createSelector(
  transactionsSelector,
  transactions => transactions.page
);

export const getIsFirstPage = createSelector(
  getPage,
  page => !page.prevPage
);

export const getIsLastPage = createSelector(
  getPage,
  page => !page.nextPage
);

export const getViewedTransaction = createSelector(
  transactionsSelector,
  getViewedTransactionId,
  (transactions, id) => transactions.byId[id] || {}
);
