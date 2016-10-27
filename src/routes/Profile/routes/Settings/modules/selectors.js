import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const profileSelector = state => state[stateKey];

export const getIsChangingPassword = createSelector(
  profileSelector,
  profile => profile.isChangingPassword
);

export const getIsRequestingPhoneVerification = createSelector(
  profileSelector,
  profile => profile.isRequestingPhoneVerification
);

export const getIsCheckingPhoneVerification = createSelector(
  profileSelector,
  profile => profile.isCheckingPhoneVerification
);

export const getIsCheckingModalVisible = createSelector(
  profileSelector,
  profile => profile.isCheckingModalVisible
);

export const getPhoneNumberToCheck = createSelector(
  profileSelector,
  profile => profile.phoneNumberToCheck
);