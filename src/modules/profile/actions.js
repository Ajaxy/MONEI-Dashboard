import * as api from 'lib/api';
import * as types from './types';
import * as selectors from './selectors';
import {addMessage} from 'modules/messages/actions';
import Validator from 'lib/validator';

export const fetchProfile = () => {
  return async dispatch => {
    dispatch({type: types.FETCH_PROFILE_REQUEST});
    try {
      const data = await api.fetchAccount();
      dispatch({
        type: types.FETCH_PROFILE_SUCCESS,
        data
      });
      window.Intercom('update', data);
      return data;
    } catch (error) {
      console.log(error);
      dispatch({type: types.FETCH_PROFILE_FAIL});
      dispatch(addMessage({text: error}));
    }
  };
};

export const updateProfileLocally = (data) => {
  return dispatch => {
    dispatch({
      type: types.UPDATE_PROFILE_LOCALLY,
      data
    });
    dispatch(validateUserProfile());
  };
};

export const updateProfile = (data, isSilent = false) => {
  return async dispatch => {
    !isSilent && dispatch({type: types.UPDATE_PROFILE_REQUEST});
    try {
      const profile = await api.updateAccount(data);
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        data: profile
      });
      dispatch(validateUserProfile());
      !isSilent && dispatch(addMessage({
        style: 'success',
        text: 'Your profile has been successfully updated'
      }));
      return data;
    } catch (error) {
      dispatch({type: types.UPDATE_PROFILE_FAIL});
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(updateProfile(data));
        }
      }));
    }
  };
};

export const updateProfileMetaData = (data, isSilent = false) => {
  return async(dispatch, getState) => {
    const userId = selectors.getUserId(getState());
    dispatch({type: types.UPDATE_PROFILE_REQUEST});
    try {
      const profile = await api.updateUserMetaData(userId, data);
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        data: profile
      });
      dispatch(validateUserProfile());
      !isSilent && dispatch(addMessage({
        style: 'success',
        text: 'Your profile has been successfully updated'
      }));
    } catch (error) {
      dispatch({type: types.UPDATE_PROFILE_FAIL});
      dispatch(addMessage({text: error}));
    }
  };
};

export const initSandbox = () => {
  return async(dispatch, getState) => {
    const state = getState();
    const profile = selectors.getProfile(state);
    const isUser = selectors.getIsUser(state);
    if (!isUser || profile.smid) {
      return dispatch({
        type: types.INIT_PROFILE_SANDBOX
      });
    }

    try {
      const name = profile.email.toLowerCase().replace(/[@ .+]/g, '_');
      const data = await api.createSandbox(name);
      dispatch(updateProfileLocally(data));
      dispatch({
        type: types.INIT_PROFILE_SANDBOX
      });
    } catch (error) {
      dispatch(addMessage({text: error}));
    }
  };
};

export const setSandboxMode = (state) => ({
  type: types.SET_PROFILE_SANDBOX,
  data: state
});

export const validateUserProfile = () => {
  return (dispatch, getState) => {
    const state = getState();
    const profile = selectors.getProfile(state);
    const isCompany = selectors.getIsCompany(state);
    const rules = {
      name: 'required',
      storeUrl: 'required',
      storeGoods: 'required',
      documentName: 'required',
      phoneNumber: 'required',
      idNumber: 'required'
    };
    if (isCompany) {
      rules.companyName = 'required';
    }
    const validator = new Validator(profile, rules);
    validator.passes();
    dispatch({
      type: types.VALIDATE_PROFILE,
      isValid: validator.errorCount === 0
    });
  };
};
