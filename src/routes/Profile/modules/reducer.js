import * as types from './types';
import {combineReducers} from 'redux';
import {UPDATE_PROFILE_SUCCESS} from 'modules/profile/types';

export const stateKey = 'profileView';

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

const isVerifyingPhone = (state = false, action) => {
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

const fileUrl = (state = null, action) => {
  switch (action.type) {
    case types.FILE_URL_UPDATE:
      return action.data;
    case types.FILE_DELETE_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isDeleteModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.FILE_DELETE_START:
      return true;
    case types.FILE_DELETE_SUCCESS:
    case types.FILE_DELETE_FAIL:
    case types.FILE_DELETE_CANCEL:
      return false;
    default:
      return state;
  }
};

const isRequestingVerification = (state = false, action) => {
  switch (action.type) {
    case types.PROFILE_VERIFICATION_REQUEST:
      return true;
    case types.PROFILE_VERIFICATION_SUCCESS:
    case types.PROFILE_VERIFICATION_FAIL:
      return false;
    default:
      return state;
  }
};

const isVerificationModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.PROFILE_VERIFICATION_START:
      return true;
    case types.PROFILE_VERIFICATION_SUCCESS:
    case types.PROFILE_VERIFICATION_FAIL:
    case types.PROFILE_VERIFICATION_CANCEL:
      return false;
    default:
      return state;
  }
};

const isShopifyModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_SHOPIFY_STORE_START:
      return true;
    case types.CREATE_SHOPIFY_STORE_CANCEL:
    case UPDATE_PROFILE_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isPhoneVerificationStarted,
  isRequestingVerification,
  isVerificationModalOpen,
  isVerifyingPhone,
  isCheckingCode,
  isEditingPhone,
  phoneNumber,
  isFileUploading,
  isFileDeleting,
  fileUrl,
  isDeleteModalOpen,
  isShopifyModalOpen
});

