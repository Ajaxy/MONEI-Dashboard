import * as api from 'lib/api';
import * as types from './types';
import storage from 'store';
import {getProfile, getIsUser, getAppMetadata} from './selectors';
import {addMessage} from 'modules/messages/actions';

export const fetchProfile = () => {
  return async dispatch => {
    dispatch({
      type: types.FETCH_PROFILE_REQUEST
    });
    try {
      const data = await api.fetchAccount();
      dispatch({
        type: types.FETCH_PROFILE_SUCCESS,
        data
      });
      window.Intercom('update', data);
      return data;
    } catch (error) {
      dispatch({
        type: types.FETCH_PROFILE_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};

export const updateProfileLocally = (data) => ({
  type: types.UPDATE_PROFILE_LOCALLY,
  data
});

export const updateProfile = ({user_id, user_metadata}) => {
  return async dispatch => {
    dispatch({type: types.UPDATE_PROFILE_REQUEST});
    try {
      const data = await api.updateUserMetaData(user_id, user_metadata);
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        data
      });
      return true;
    } catch (error) {
      dispatch({
        type: types.UPDATE_PROFILE_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(updateProfile({user_id, user_metadata}));
        }
      }));
      return false
    }
  };
};

export const initSandbox = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const profile = getProfile(state);
    const isUser = getIsUser(state);
    const appMetadata = getAppMetadata(state);
    if(!isUser || appMetadata.smid) {
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
    } catch(error) {
      dispatch(addMessage({text: error}));
    }
  };
};

export const setSandboxMode = (state) => ({
  type: types.SET_PROFILE_SANDBOX,
  data: state
});
