import * as api from 'lib/api';
import * as types from './types';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import * as authActions from 'modules/auth/actions';
import * as profileActions from 'modules/profile/actions';
import * as profileSelectors from 'modules/profile/selectors';
import {fileUpload, fileDelete, fileGetUrl} from 'lib/aws';

export const goToNextStep = () => ({
  type: types.ONBOARDING_NEXT_STEP
});

export const goToPrevStep = () => ({
  type: types.ONBOARDING_PREV_STEP
});

export const updateStep = (user) => ({
  type: types.ONBOARDING_UPDATE_STEP,
  data: user,
});

export const signOut = () => dispatch => {
  dispatch(authActions.signOut());
};

export const updateProfile = (userId, {user_metadata}) => async (dispatch) => {
  return await dispatch(profileActions.modifyProfile(userId, {user_metadata}));
};

export const openConfirmDeleteModal = () => ({
  type: types.ONBOARDING_CONFIRM_DELETE_START
});

export const closeConfirmDeleteModal = () => ({
  type: types.ONBOARDING_CONFIRM_DELETE_END
});

export const openConfirmRegisterModal = () => ({
  type: types.ONBOARDING_CONFIRM_REGISTER_START
});

export const closeConfirmRegisterModal = () => ({
  type: types.ONBOARDING_CONFIRM_REGISTER_END
});

export const uploadFile = (file) => async (dispatch, getState) => {
  const profile = profileSelectors.getProfile(getState());
  const userMetadata = profileSelectors.getUserMetadata(getState());
  dispatch({type: types.ONBOARDING_UPLOAD_FILE_START});
  try {
    await fileUpload(profile.user_id, file);
    const user_metadata = Object.assign({}, userMetadata, {document_name: file.name});
    await dispatch(updateProfile(profile.user_id, {user_metadata}));
  } catch(error) {
    dispatch(addMessage({
      text: error,
      onRetry() {
        dispatch(uploadFile(file));
      }
    }));
  }
  dispatch({type: types.ONBOARDING_UPLOAD_FILE_END});
};

export const deleteFile = () => async (dispatch, getState) => {
  const profile = profileSelectors.getProfile(getState());
  const userMetadata = profileSelectors.getUserMetadata(getState());
  dispatch({type: types.ONBOARDING_DELETE_FILE_START});
  try {
    await fileDelete(profile.user_id, userMetadata.document_name);
    const user_metadata = Object.assign({}, userMetadata, {document_name: ""});
    await dispatch(updateProfile(profile.user_id, {user_metadata}));
  } catch(error) {
    dispatch(addMessage({
      text: error,
      onRetry() {
        dispatch(deleteFile());
      }
    }));
  }
  dispatch({type: types.ONBOARDING_DELETE_FILE_END});
};

export const getFileUrl = (name) => async (dispatch, getState) => {
  const profile = profileSelectors.getProfile(getState());
  const isAdmin = profileSelectors.getIsAdmin(getState());
  try {
    const data = await fileGetUrl(profile.user_id, name, isAdmin);
    dispatch({type: types.ONBOARDING_UPDATE_FILE_URL, data});
  } catch(error) {
    dispatch(addMessage({
      text: error,
      onRetry() {
        dispatch(getFileUrl(name));
      }
    }));
  }
};

export const requestVerification = () => async (dispatch, getState) => {
  const profile = profileSelectors.getProfile(getState());
  const userMetadata = profileSelectors.getUserMetadata(getState());
  const user_metadata = Object.assign({}, userMetadata, {verification_requested: true});
  const success = await dispatch(updateProfile(profile.user_id, {user_metadata}));
  if (success) {
    dispatch(addMessage({
      text: 'Verification is pending. We will check your data as soon as possible.',
      style: 'success',
    }));
  }
  return success;
};