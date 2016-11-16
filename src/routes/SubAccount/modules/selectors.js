import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {getActiveSubAccount} from '../../SubAccounts/modules/selectors';

const subAccountSelector = state => state[stateKey];
export const getSubAccount = getActiveSubAccount;

export const getSelectedPlatform = createSelector(
  subAccountSelector,
  subAccount => subAccount.selectedPlatform
);
