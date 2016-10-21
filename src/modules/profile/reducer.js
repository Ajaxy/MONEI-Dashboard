import * as types from './types';
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
    case types.MODIFY_PROFILE_REQUEST:
      return true;
    case types.MODIFY_PROFILE_SUCCESS:
    case types.MODIFY_PROFILE_FAIL:
      return false;
    default:
      return state;
  }
};

const defaultUserMetadata = {profile_type: 'individual'};
const profileState = storage.get('profile') || {};
const data = (state = profileState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
    case types.MODIFY_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE:
      const newProfile = {...state, ...action.data};
      newProfile.user_metadata = Object.assign({}, 
        defaultUserMetadata, 
        (action.data || {}).user_metadata
      );
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

const cachedSandbox = storage.get('sandbox');
const defaultSandboxMode = cachedSandbox !== undefined ? cachedSandbox : true;
const isInSandboxMode = (state = defaultSandboxMode, action) => {
  let nextState = state;
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
    case types.UPDATE_PROFILE:
      const appMetadata = (action.data || {}).app_metadata;
      if (!appMetadata.mid) 
        nextState = true;
      storage.set('sandbox', nextState);
      return nextState;
    case types.SET_PROFILE_SANDBOX:
      nextState = !!action.data;
      storage.set('sandbox', nextState);
      return nextState;
    case types.INIT_PROFILE_SANDBOX:
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
