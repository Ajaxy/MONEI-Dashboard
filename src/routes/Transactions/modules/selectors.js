import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import moment from 'moment';

const customersSelector = state => state[stateKey];
const activeTransactionIdSelector = state => state.router.params.customerId;
export const getTransactions = createSelector(
  customersSelector,
  customers => customers.ids.map(id => customers.byId[id])
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

export const getIsDetailsModalOpen = createSelector(
  customersSelector,
  customers => customers.isDetailsModalOpen
);

export const getPage = createSelector(
  customersSelector,
  customers => customers.page
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
  customersSelector,
  customers => customers.byId[customers.transactionViewed] || {}
);
