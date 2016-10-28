import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const settingsSelector = state => state[stateKey];

export const getIsChangingPassword = createSelector(
  settingsSelector,
  settings => settings.isChangingPassword
);

export const getIsPhoneVerificationStarted = createSelector(
  settingsSelector,
  settings => settings.isPhoneVerificationStarted
);

export const getIsVerifying = createSelector(
  settingsSelector,
  settings => settings.isVerifying
);

export const getIsCheckingCode = createSelector(
  settingsSelector,
  settings => settings.isCheckingCode
);

export const getIsEditingPhone = createSelector(
  settingsSelector,
  settings => settings.isEditingPhone
);

export const getPhoneNumber = createSelector(
  settingsSelector,
  settings => settings.phoneNumber
);
