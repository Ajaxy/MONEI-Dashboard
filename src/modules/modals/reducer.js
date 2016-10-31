import * as types from './types';
import {combineReducers} from 'redux';

export const stateKey = 'modals';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return [...state, action.modalId];
    case types.CLOSE_MODAL:
      let index = state.indexOf(action.modalId);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {...state, ...action.byId};
    case types.CLOSE_MODAL:
      const newState = {...state};
      delete newState[action.modalId];
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId
});

