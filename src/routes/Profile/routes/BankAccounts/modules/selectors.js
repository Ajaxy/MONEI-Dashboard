import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const bankAccountsSelector = state => state[stateKey];

export const getBankAccounts = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.ids.map(id => bankAccounts.byId[id])
);

export const getBankAccountById = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.byId || {}
);

export const getIsFetching = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isFetching
);

export const getIsUpToDate = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isUpToDate
);

export const getIsSaving = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isSaving
);

export const getIsDeleting = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isDeleting
);

export const getIsDeleteModalOpen = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isDeleteModalOpen
);

export const getIsSaveModalOpen = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isSaveModalOpen
);

export const getActiveBankAccount = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.byId[bankAccounts.activeId] || {}
);

export const getPrimaryBankAccount = createSelector(
  getBankAccounts,
  bankAccounts => bankAccounts.find(a => a.isPrimary) || {}
);
