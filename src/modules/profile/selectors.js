import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import base64 from 'base64-url';
import {USER_ROLES} from 'lib/enums';

const profileSelector = state => state[stateKey];

export const getIsFetching = createSelector(
  profileSelector,
  profile => profile.isFetching
);

export const getIsUpdating = createSelector(
  profileSelector,
  profile => profile.isUpdating
);

export const getProfile = createSelector(
  profileSelector,
  profile => profile.data || {}
);

export const getUserId = createSelector(
  getProfile,
  data => data.user_id
);

export const getAppMetadata = createSelector(
  getProfile,
  profile => profile.app_metadata || {}
);

export const getUserMetadata = createSelector(
  getProfile,
  profile => profile.user_metadata || {}
);

export const getProfileType = createSelector(
  getProfile,
  data => data.profileType
);

export const getIsUser = createSelector(
  getProfile,
  data => data.role === USER_ROLES.User
);

export const getIsAdmin = createSelector(
  getProfile,
  data => data.role === USER_ROLES.Admin
);

export const getIsMerchant = createSelector(
  getAppMetadata,
  appMetadata => !!appMetadata.mid
);

export const getIsCompany = createSelector(
  getProfileType,
  profileType => profileType === 'company'
);

export const getIsVerificationRequested = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.verification_requested
);

export const getIsVerified = createSelector(
  getProfile,
  data => data.verified
);

export const getIsUsingAuth0UserPass = createSelector(
  getUserId,
  userId => userId.indexOf('auth0') === 0
);

export const getIsSandboxInitialized = createSelector(
  profileSelector,
  profile => profile.isSandboxInitialized
);

export const getIsInSandboxMode = createSelector(
  profileSelector,
  profile => profile.isInSandboxMode
);

export const getIsReadyForProduction = createSelector(
  profileSelector,
  getIsVerificationRequested,
  getIsVerified,
  (profile, isVerificationRequested, isVerified) => (
    !isVerified && !isVerificationRequested && profile.isReadyForProduction
  )
);
