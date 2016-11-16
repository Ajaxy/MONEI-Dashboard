import * as types from './types';
import {combineReducers} from 'redux';

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

export default combineReducers({
  selectedPlatform
});
