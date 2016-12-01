import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const subAccountsSelector = state => state[stateKey];
const activeSubAccountIdSelector = state => state.route.params.subAccountId;
export const getSubAccounts = createSelector(
  subAccountsSelector,
  subAccounts => subAccounts.ids.map(id => subAccounts.byId[id])
);

export const getSubAccountById = createSelector(
  subAccountsSelector,
  subAccounts => subAccounts.byId || []
);

export const getActiveSubAccount = createSelector(
  subAccountsSelector,
  activeSubAccountIdSelector,
  (subAccounts, subAccountId) => subAccounts.byId[subAccountId] || {}
);

export const getIsFetching = createSelector(
  subAccountsSelector,
  subAccounts => subAccounts.isFetching
);

export const getIsUpToDate = createSelector(
  subAccountsSelector,
  subAccounts => subAccounts.isUpToDate
);
