import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/users';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getIsUpToDate, getUser, getIsVerified} from './selectors';
import {fileGetUrl} from 'lib/aws';
import {signOut} from 'modules/auth/actions';

export const fetchUser = (userId) => {
  return async dispatch => {
    dispatch({type: types.FETCH_USER_REQUEST});
    try {
      const result = await api.fetchUser(userId);
      const normalized = normalize(result, schema.user);
      dispatch({
        type: types.FETCH_USER_SUCCESS,
        byId: normalized.entities.users,
        userId: normalized.result
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USER_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchUser(userId));
        }
      }));
    }
  };
};

export const verifyUserStart = () => ({
  type: types.VERIFY_USER_START
});

export const verifyUserCancel = () => ({
  type: types.VERIFY_USER_CANCEL
});

export const verifyUser = (userId) => {
  return async dispatch => {
    dispatch({type: types.VERIFY_USER_REQUEST});
    try {
      const result = await api.verifyUser(userId);
      const normalized = normalize(result, schema.user);
      dispatch({
        type: types.VERIFY_USER_SUCCESS,
        byId: normalized.entities.users,
        userId: normalized.result
      });
      dispatch(addMessage({
        text: 'User was successfully verified',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.VERIFY_USER_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(loginAsUser(userId));
        }
      }));
    }
  };
};

export const loginAsUser = (userId) => {
  return async dispatch => {
    dispatch({type: types.IMPERSONATE_USER_REQUEST});
    try {
      const result = await api.impersonateUser(userId, {
        redirect_uri: window.location.origin
      });
      signOut();
      window.location.href = result;
    } catch (error) {
      dispatch({type: types.IMPERSONATE_USER_FAIL});
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(loginAsUser(userId));
        }
      }));
    }
  };
};

export const updateUser = (userId, data) => {
  return async dispatch => {
    dispatch({type: types.UPDATE_USER_REQUEST});
    try {
      const result = await api.updateUser(userId, data);
      const normalized = normalize(result, schema.user);
      dispatch({
        type: types.UPDATE_USER_SUCCESS,
        byId: normalized.entities.users,
        userId: normalized.result
      });
      dispatch(addMessage({
        text: 'User was updated',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.UPDATE_USER_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(updateUser(userId, data));
        }
      }));
    }
  };
};

export const fetchFileUrl = (name) => {
  return async(dispatch, getState) => {
    const state = getState();
    const user = getUser(state);
    const isVerified = getIsVerified(state);
    try {
      const data = await fileGetUrl(user.id, name, isVerified);
      dispatch({type: types.USER_FILE_URL_UPDATE, data});
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

