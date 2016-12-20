import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import moment from 'moment';

const transactionsSelector = state => state[stateKey];
export const getTransactions = createSelector(
  transactionsSelector,
  transactions => transactions.ids.map(id => transactions.byId[id])
);

export const getIsFetching = createSelector(
  transactionsSelector,
  transactions => transactions.isFetching
);

export const getIsDetailsModalOpen = createSelector(
  transactionsSelector,
  transactions => transactions.isDetailsModalOpen
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

export const getFromDate = createSelector(
  getPage,
  page => moment(page.from).format('MMMM DD, YYYY')
);

export const getToDate = createSelector(
  getPage,
  page => moment(page.to).format('MMMM DD, YYYY')
);

export const getViewedTransaction = createSelector(
  transactionsSelector,
  transactions => transactions.byId[transactions.transactionViewed] || {}
);
