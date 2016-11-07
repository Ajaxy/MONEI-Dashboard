import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const bankAccountsSelector = state => state[stateKey];

export const getBankAccounts = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.ids.map(id => bankAccounts.byId[id])
);

export const getIsFetching = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isFetching
);

export const getIsUpToDate = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isUpToDate
);

export const getIsAdding = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isAdding
);

export const getIsDeleting = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isDeleting
);

export const getIsDeleteModalOpen = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isDeleteModalOpen
);

export const getIsAddModalOpen = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isAddModalOpen
);

export const getDeletingBankAccount = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.byId[bankAccounts.bankAccountToDelete] || {}
);
