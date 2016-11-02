import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const bankAccountsSelector = state => state[stateKey];

export const getIsAdding = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isAdding
);

export const getIsAddModalOpen = createSelector(
  bankAccountsSelector,
  bankAccounts => bankAccounts.isAddModalOpen
);
