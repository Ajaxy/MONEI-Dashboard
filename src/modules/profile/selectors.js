import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {isEmpty} from 'lib/utils';
import base64 from 'base64-url';
import {USER_ROLES} from 'lib/enums';

const profileSelector = state => state[stateKey];

export const getIsFetching = createSelector(
  profileSelector,
  profile => profile.isFetching
);

export const getProfile = createSelector(
  profileSelector,
  profile => profile.data
);

export const getUserId = createSelector(
  getProfile,
  data => data.user_id
);

export const getAppMetadata =  createSelector(
  getProfile,
  profile => profile.app_metadata || {}
);

export const getPhoneNumber = createSelector(
  getAppMetadata,
  appMetadata => appMetadata.phone_number || ''
);

export const getIsUser = createSelector(
  getAppMetadata,
  appMetadata => appMetadata.role == USER_ROLES.User
);

export const getIsAdmin = createSelector(
  getAppMetadata,
  appMetadata => appMetadata.role == USER_ROLES.Admin
);

export const getIsMerchant = createSelector(
  getAppMetadata,
  appMetadata => !!appMetadata.mid
);

export const getIsCompany = createSelector(
  getProfileType,
  profileType => profileType == 'company'
);

export const getIsVerificationRequested = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.verification_requested
);

export const getUserIdBase64 = createSelector(
  getUserId,
  id => base64.encode(id)
);

export const getIsSandboxInitialized = createSelector(
  profileSelector,
  profile => profile.isSandboxInitialized
);

export const getIsInSandboxMode = createSelector(
  profileSelector,
  profile => profile.isInSandboxMode
);