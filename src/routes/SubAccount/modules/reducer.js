import * as types from './types';
import {combineReducers} from 'redux';

export const stateKey = 'activeChannel';

const selectedPlatform = (state = 0, action) => {
  switch (action.type) {
    case types.UPDATE_SELECTED_PLATFORM:
      return action.platform || 0;
    default:
      return state;
  }
};

export default combineReducers({
  selectedPlatform
});
