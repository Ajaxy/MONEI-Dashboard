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

export const getIsVerifyingPhone = createSelector(
  settingsSelector,
  settings => settings.isVerifyingPhone
);

export const getIsRequestingVerification = createSelector(
  settingsSelector,
  settings => settings.isRequestingVerification
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

export const getIsUpdatingMetaData = createSelector(
  settingsSelector,
  settings => settings.isUpdatingMetaData
);

export const getIsFileUploading = createSelector(
  settingsSelector,
  settings => settings.isFileUploading
);

export const getIsFileDeleting = createSelector(
  settingsSelector,
  settings => settings.isFileDeleting
);

export const getFileUrl = createSelector(
  settingsSelector,
  settings => settings.fileUrl
);

export const getIsDeleteModalOpen = createSelector(
  settingsSelector,
  settings => settings.isDeleteModalOpen
);

export const getIsVerificationModalOpen = createSelector(
  settingsSelector,
  settings => settings.isVerificationModalOpen
);
