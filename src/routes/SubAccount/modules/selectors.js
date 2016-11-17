import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {getActiveSubAccount} from 'routes/SubAccounts/modules/selectors';

const subAccountSelector = state => state[stateKey];
export const getSubAccount = getActiveSubAccount;

export const getSelectedPlatform = createSelector(
  subAccountSelector,
  subAccount => subAccount.selectedPlatform
);

export const getIsCreatingZapierToken = createSelector(
  subAccountSelector,
  subAccount => subAccount.isCreatingZapierToken
);
