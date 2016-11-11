import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {PAGE_LIMIT} from 'lib/constants';

const subAccountsSelector = state => state[stateKey];
const activeSubAccountIdSelector = state => state.router.params.subAccountId;
export const getSubAccounts = createSelector(
  subAccountsSelector,
  subAccounts => subAccounts.ids.map(id => subAccounts.byId[id]).slice(0, PAGE_LIMIT)
);

export const getSubAccountIds = createSelector(
  subAccountsSelector,
  subAccounts => subAccounts.ids
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
