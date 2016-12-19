import * as types from './types';
import {combineReducers} from 'redux';
export const stateKey = 'activeUser';

const isFetching = (state = true, action) => {
  switch (action.type) {
    case types.FETCH_USER_REQUEST:
      return true;
    case types.FETCH_USER_SUCCESS:
    case types.FETCH_USER_FAIL:
      return false;
    default:
      return state;
  }
};

const isUpdating = (state = false, action) => {
  switch (action.type) {
    case types.UPDATE_USER_REQUEST:
      return true;
    case types.UPDATE_USER_SUCCESS:
    case types.UPDATE_USER_FAIL:
      return false;
    default:
      return state;
  }
};

const isVerifying = (state = false, action) => {
  switch (action.type) {
    case types.VERIFY_USER_REQUEST:
      return true;
    case types.VERIFY_USER_SUCCESS:
    case types.VERIFY_USER_FAIL:
      return false;
    default:
      return state;
  }
};

const isUpToDate = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      return true;
    case types.FETCH_USER_REQUEST:
      return false;
    default:
      return state;
  }
};

const fileUrl = (state = null, action) => {
  switch (action.type) {
    case types.USER_FILE_URL_UPDATE:
      return action.data;
    case types.FETCH_USER_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isVerificationModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.VERIFY_USER_START:
      return true;
    case types.VERIFY_USER_SUCCESS:
    case types.VERIFY_USER_FAIL:
    case types.VERIFY_USER_CANCEL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  isUpdating,
  isVerifying,
  isUpToDate,
  isVerificationModalOpen,
  fileUrl
});

