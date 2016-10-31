import * as types from './types';
import {combineReducers} from 'redux';

export const stateKey = 'profileSettings';

const isChangingPassword = (state = false, action) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD_REQUEST:
      return true;
    case types.CHANGE_PASSWORD_SUCCESS:
    case types.CHANGE_PASSWORD_FAIL:
      return false;
    default:
      return state;
  }
};

const phoneNumber = (state = null, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_START_SUCCESS:
      return action.phoneNumber;
    default:
      return state;
  }
};

const isPhoneVerificationStarted = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_START_SUCCESS:
      return true;
    case types.PHONE_VERIFICATION_CHECK_CANCEL:
    case types.PHONE_VERIFICATION_CHECK_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isEditingPhone = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_EDIT_START:
      return true;
    case types.PHONE_EDIT_CANCEL:
    case types.PHONE_VERIFICATION_CHECK_SUCCESS:
      return false;
    default:
      return state;
  }
};

const isVerifying = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_START_REQUEST:
      return true;
    case types.PHONE_VERIFICATION_START_SUCCESS:
    case types.PHONE_VERIFICATION_START_FAIL:
      return false;
    default:
      return state;
  }
};

const isCheckingCode = (state = false, action) => {
  switch (action.type) {
    case types.PHONE_VERIFICATION_CHECK_REQUEST:
      return true;
    case types.PHONE_VERIFICATION_CHECK_SUCCESS:
    case types.PHONE_VERIFICATION_CHECK_FAIL:
    case types.PHONE_VERIFICATION_CHECK_CANCEL:
      return false;
    default:
      return state;
  }
};

const isUpdatingMetaData = (state = false, action) => {
  switch (action.type) {
    case types.UPDATE_PROFILE_METADATA_REQUEST:
      return true;
    case types.UPDATE_PROFILE_METADATA_SUCCESS:
    case types.UPDATE_PROFILE_METADATA_FAIL:
      return false;
    default:
      return state;
  }
};

const isFileUploading = (state = false, action) => {
  switch (action.type) {
    case types.FILE_UPLOAD_REQUEST:
      return true;
    case types.FILE_UPLOAD_SUCCESS:
    case types.FILE_UPLOAD_FAIL:
      return false;
    default:
      return state;
  }
};

const isFileDeleting = (state = false, action) => {
  switch (action.type) {
    case types.FILE_DELETE_REQUEST:
      return true;
    case types.FILE_DELETE_SUCCESS:
    case types.FILE_DELETE_FAIL:
      return false;
    default:
      return state;
  }
};

const fileUrl = (state = '', action) => {
  switch (action.type) {
    case types.FILE_URL_UPDATE:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  isChangingPassword,
  isUpdatingMetaData,
  isPhoneVerificationStarted,
  isVerifying,
  isCheckingCode,
  isEditingPhone,
  phoneNumber,
  isFileUploading,
  isFileDeleting,
  fileUrl
});

