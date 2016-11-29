import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const subAccounts = state => state[stateKey];

export const getSubAccounts = createSelector(
  subAccounts,
  subAccounts => subAccounts.subAccountIds.map(id => subAccounts.subAccountsById[id])
);

export const getBankAccountById = createSelector(
  subAccounts,
  subAccounts => subAccounts.bankAccountsById
);

export const getBankAccounts = createSelector(
  subAccounts,
  subAccounts => subAccounts.bankAccountIds.map(id => subAccounts.bankAccountsById[id])
);

export const getIsSyncing = createSelector(
  subAccounts,
  subAccounts => subAccounts.isSyncing
);

export const getIsFetchingSubAccounts = createSelector(
  subAccounts,
  subAccounts => subAccounts.isFetchingSubAccounts
);

export const getIsFetchingBankAccounts = createSelector(
  subAccounts,
  subAccounts => subAccounts.isFetchingBankAccounts
);

export const getIsConfirmingBankAccounts = createSelector(
  subAccounts,
  subAccounts => subAccounts.isConfirmingBankAccount
);

export const getIsSubAccountsUpToDate = createSelector(
  subAccounts,
  subAccounts => subAccounts.isSubAccountsUpToDate
);

export const getIsUpdatingSubAccount = createSelector(
  subAccounts,
  subAccounts => subAccounts.isUpdatingSubAccount
);

export const getIsUpdateModalOpen = createSelector(
  subAccounts,
  subAccounts => subAccounts.isUpdateModalOpen
);

export const getActiveSubAccount = createSelector(
  subAccounts,
  subAccounts => subAccounts.subAccountsById[subAccounts.activeSubAccountId] || {}
);

export const getIsBankAccountsUpToDate = createSelector(
  subAccounts,
  subAccounts => subAccounts.isBankAccountsUpToDate
);
