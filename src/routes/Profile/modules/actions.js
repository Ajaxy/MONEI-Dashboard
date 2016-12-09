import * as api from 'lib/api';
import * as types from './types';
import {getPhoneNumber} from './selectors';
import {trackEvent} from 'lib/intercom';
import {addMessage} from 'modules/messages/actions';
import {updateProfileMetaData, updateProfileLocally, updateProfile} from 'modules/profile/actions';
import * as selectors from 'modules/profile/selectors';
import {fileUpload, fileDelete, fileGetUrl} from 'lib/aws';
import {push} from 'react-router-redux';

export const phoneEditStart = () => ({
  type: types.PHONE_EDIT_START
});

export const phoneEditCancel = () => ({
  type: types.PHONE_EDIT_CANCEL
});

export const phoneVerificationStart = ({phoneNumber}) => {
  return async dispatch => {
    dispatch({
      type: types.PHONE_VERIFICATION_START_REQUEST
    });
    try {
      await api.phoneVerificationStart({phoneNumber});
      dispatch({
        type: types.PHONE_VERIFICATION_START_SUCCESS,
        phoneNumber
      });
      dispatch(addMessage({
        style: 'success',
        text: 'You should receive SMS with verification code'
      }));
    } catch (error) {
      dispatch({
        type: types.PHONE_VERIFICATION_START_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};

export const phoneVerificationCancel = () => ({
  type: types.PHONE_VERIFICATION_CHECK_CANCEL
});

export const phoneVerificationCheck = ({verificationCode}) => {
  return async(dispatch, getState) => {
    const state = getState();
    const phoneNumber = getPhoneNumber(state);
    const profile = selectors.getProfile(getState());
    dispatch({
      type: types.PHONE_VERIFICATION_CHECK_REQUEST
    });
    try {
      await api.phoneVerificationCheck({
        phoneNumber,
        verificationCode
      });
      profile.app_metadata.phone_number = phoneNumber;
      dispatch(updateProfileLocally(profile));
      dispatch({
        type: types.PHONE_VERIFICATION_CHECK_SUCCESS
      });
      dispatch(addMessage({
        style: 'success',
        text: 'Your phone has been successfully verified'
      }));
    } catch (error) {
      dispatch({
        type: types.PHONE_VERIFICATION_CHECK_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};

export const uploadFile = (file) => {
  return async(dispatch, getState) => {
    const state = getState();
    const profile = selectors.getProfile(state);
    dispatch({type: types.FILE_UPLOAD_REQUEST});
    try {
      await fileUpload(profile.id, file);
      await dispatch(updateProfile({documentName: file.name}));
      dispatch({type: types.FILE_UPLOAD_SUCCESS});
    } catch (error) {
      dispatch({type: types.FILE_UPLOAD_FAIL});
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(uploadFile(file));
        }
      }));
    }
  };
};

export const deleteFileStart = () => ({
  type: types.FILE_DELETE_START
});

export const deleteFileCancel = () => ({
  type: types.FILE_DELETE_CANCEL
});

export const deleteFile = () => {
  return async(dispatch, getState) => {
    const state = getState();
    const profile = selectors.getProfile(state);
    dispatch({type: types.FILE_DELETE_REQUEST});
    try {
      await fileDelete(profile.id, profile.documentName);
      await dispatch(updateProfile({documentName: null}));
      dispatch({type: types.FILE_DELETE_SUCCESS});
    } catch (error) {
      dispatch({type: types.FILE_DELETE_FAIL});
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(deleteFile());
        }
      }));
    }
  };
};

export const fetchFileUrl = (name) => {
  return async(dispatch, getState) => {
    const state = getState();
    const profile = selectors.getProfile(state);
    try {
      const data = await fileGetUrl(profile.id, name);
      dispatch({type: types.FILE_URL_UPDATE, data});
      return data;
    } catch (error) {
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchFileUrl(name));
        }
      }));
    }
  };
};

export const requestVerificationStart = () => ({
  type: types.PROFILE_VERIFICATION_START
});

export const requestVerificationCancel = () => ({
  type: types.PROFILE_VERIFICATION_CANCEL
});

export const requestVerification = ({redirect}) => {
  return async(dispatch, getState) => {
    const profile = selectors.getProfile(getState());
    profile.user_metadata.verification_requested = true;
    dispatch({
      type: types.PROFILE_VERIFICATION_REQUEST
    });
    try {
      await dispatch(updateProfileMetaData(profile.user_metadata));
      dispatch({
        type: types.PROFILE_VERIFICATION_SUCCESS
      });
      trackEvent('monei_requested_verification');
      dispatch(addMessage({
        text: 'Verification is pending. We will check your data as soon as possible.',
        style: 'success'
      }));
      if (redirect) {
        dispatch(push('/'));
      }
    } catch (error) {
      dispatch({
        type: types.PROFILE_VERIFICATION_FAIL
      });
      dispatch(addMessage({
        text: error
      }));
    }
  };
};

export const createShopifyStoreStart = () => ({
  type: types.CREATE_SHOPIFY_STORE_START
});

export const createShopifyStoreCancel = () => ({
  type: types.CREATE_SHOPIFY_STORE_CANCEL
});
