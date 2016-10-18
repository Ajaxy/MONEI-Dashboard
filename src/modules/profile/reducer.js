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

const defaultUserMetadata = {profile_type: 'individual'};
const profileState = storage.get('profile') || {};
const data = (state = profileState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
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

export default combineReducers({
  isFetching,
  data
});
