import * as types from './types';
import {combineReducers} from 'redux';
import storage from 'store';

export const stateKey = 'activeChannel';

const selectedPlatform = (state = 0, action) => {
  switch (action.type) {
    case types.UPDATE_SELECTED_PLATFORM:
      console.log(action);
      return action.platform;
    default:
      return state;
  }
};

const defaultZapierToken = storage.get('zapier_api_token') || '';
const zapierToken = (state = defaultZapierToken, action) => {
  switch (action.type) {
    case types.CREATE_ZAPIER_TOKEN_SUCCESS:
      storage.set('zapier_api_token', action.token);
      return action.token;
    default:
      return state;
  }
};

const isCreatingZapierToken = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_ZAPIER_TOKEN_REQUEST:
      return true;
    case types.CREATE_ZAPIER_TOKEN_SUCCESS:
    case types.CREATE_ZAPIER_TOKEN_FAIL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  selectedPlatform,
  zapierToken,
  isCreatingZapierToken
});
