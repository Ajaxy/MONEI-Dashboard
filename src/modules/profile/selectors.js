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

export const getIsModifying = createSelector(
  profileSelector,
  profile => profile.isModifying
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

export const getUserMetadata = createSelector(
  getProfile,
  profile => profile.user_metadata || {}
);

export const getName = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.name || ""
);

export const getAcquirer = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.acquirer
);

export const getAcquirerOffice = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.acquirer_office
);

export const getCompanyName = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.company_name
);

export const getCountry = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.country || ""
);

export const getDocumentName = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.document_name
);

export const getIban = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.iban
);

export const getIdNumber = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.id_number
);

export const getProfileType = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.profile_type
);

export const getStoreUrl = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.store_url
);

export const getStoreGoods = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.store_goods
);

export const getVatNumber = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.vat_number
);

export const getPhoneNumber = createSelector(
  getAppMetadata,
  appMetadata => appMetadata.phone_number || ''
);

export const getIsPhoneVerified = createSelector(
  getAppMetadata,
  appMetadata => !!appMetadata.phone_number
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
  profileType => profileType === 'company'
);

export const getIsVerificationRequested = createSelector(
  getUserMetadata,
  userMetadata => userMetadata.verification_requested
);

export const getIsUsingAuth0UserPass = createSelector(
  getUserId,
  userId => userId.indexOf("auth0") === 0
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
