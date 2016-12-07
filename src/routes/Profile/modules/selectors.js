import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const profileSelector = state => state[stateKey];

export const getIsPhoneVerificationStarted = createSelector(
  profileSelector,
  profile => profile.isPhoneVerificationStarted
);

export const getIsVerifyingPhone = createSelector(
  profileSelector,
  profile => profile.isVerifyingPhone
);

export const getIsRequestingVerification = createSelector(
  profileSelector,
  profile => profile.isRequestingVerification
);

export const getIsCheckingCode = createSelector(
  profileSelector,
  profile => profile.isCheckingCode
);

export const getIsEditingPhone = createSelector(
  profileSelector,
  profile => profile.isEditingPhone
);

export const getPhoneNumber = createSelector(
  profileSelector,
  profile => profile.phoneNumber
);

export const getIsFileUploading = createSelector(
  profileSelector,
  profile => profile.isFileUploading
);

export const getIsFileDeleting = createSelector(
  profileSelector,
  profile => profile.isFileDeleting
);

export const getFileUrl = createSelector(
  profileSelector,
  profile => profile.fileUrl
);

export const getIsDeleteModalOpen = createSelector(
  profileSelector,
  profile => profile.isDeleteModalOpen
);

export const getIsVerificationModalOpen = createSelector(
  profileSelector,
  profile => profile.isVerificationModalOpen
);

export const getIsShopifyModalOpen = createSelector(
  profileSelector,
  profile => profile.isShopifyModalOpen
);
