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

export const updateProfile = (data) => {
  return async dispatch => {
    dispatch({type: types.UPDATE_PROFILE_REQUEST});
    try {
      const data = await api.updateAccount(data);
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        data
      });
      dispatch(validateUserProfile());
      dispatch(addMessage({
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

export const updateProfileMetaData = (metadata) => {
  return async(dispatch, getState) => {
    const userId = selectors.getUserId(getState());
    dispatch({type: types.UPDATE_PROFILE_REQUEST});
    try {
      const data = await api.updateUserMetaData(userId, metadata);
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        data
      });
      dispatch(validateUserProfile());
      dispatch(addMessage({
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
    const appMetadata = selectors.getAppMetadata(state);
    if (!isUser || appMetadata.smid) {
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
    const userMetadata = selectors.getUserMetadata(state);
    const appMetadata = selectors.getAppMetadata(state);
    const isCompany = selectors.getIsCompany(state);
    const rules = {
      name: 'required',
      store_url: 'required',
      store_goods: 'required',
      document_name: 'required',
      phone_number: 'required'
    };
    if (isCompany) {
      rules.vat_number = 'required';
      rules.company_name = 'required';
    }
    if (!isCompany) {
      rules.id_number = 'required';
    }
    const validator = new Validator({...userMetadata, ...appMetadata}, rules);
    validator.passes();
    dispatch({
      type: types.VALIDATE_PROFILE,
      isValid: validator.errorCount === 0
    });
  };
};
