import * as types from './types';
import {UNAUTH} from 'modules/auth/types';
import storage from 'store';
import {combineReducers} from 'redux';

export const stateKey = 'profile';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_REQUEST:
      return true;
    case types.FETCH_PROFILE_SUCCESS:
    case types.FETCH_PROFILE_FAIL:
      return false;
    default:
      return state;
  }
};

const isModifying = (state = false, action) => {
  switch (action.type) {
    case types.UPDATE_PROFILE_REQUEST:
      return true;
    case types.UPDATE_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE_FAIL:
      return false;
    default:
      return state;
  }
};

const profileState = storage.get('profile') || {};
const data = (state = profileState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE_LOCALLY:
      const newProfile = {...state, ...action.data};
      storage.set('profile', newProfile);
      return newProfile;
    default:
      return state;
  }
};

const isSandboxInitialized = (state = false, action) => {
  switch (action.type) {
    case types.INIT_PROFILE_SANDBOX:
      return true;
    default:
      return state;
  }
};

const defaultSandboxMode = storage.get('sandbox') || false;
const isInSandboxMode = (state = defaultSandboxMode, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE_LOCALLY:
      const appMetadata = (action.data || {}).app_metadata;
      if (!appMetadata.mid) {
        return true;
      }
      return state;
    case types.SET_PROFILE_SANDBOX:
      const nextState = !!action.data;
      storage.set('sandbox', nextState);
      return nextState;
    case UNAUTH:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  isModifying,
  isSandboxInitialized,
  isInSandboxMode,
  data
});
