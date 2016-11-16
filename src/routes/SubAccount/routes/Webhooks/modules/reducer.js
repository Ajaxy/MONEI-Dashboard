import * as types from './types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_WEBHOOKS_REQUEST:
      return [];
    case types.FETCH_WEBHOOKS_SUCCESS:
    case types.SAVE_WEBHOOK_SUCCESS:
      return mergeArrays(state, action.ids);
    case types.DELETE_WEBHOOK_SUCCESS:
      let index = state.indexOf(action.webhookId);
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
    case types.FETCH_WEBHOOKS_REQUEST:
      return {};
    case types.FETCH_WEBHOOKS_SUCCESS:
    case types.SAVE_WEBHOOK_SUCCESS:
      return {...state, ...action.byId};
    case types.DELETE_WEBHOOK_SUCCESS:
      const newState = {...state};
      delete newState[action.webhookId];
      return newState;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_WEBHOOKS_REQUEST:
      return true;
    case types.FETCH_WEBHOOKS_SUCCESS:
    case types.FETCH_WEBHOOKS_FAIL:
      return false;
    default:
      return state;
  }
};

const isSaving = (state = false, action) => {
  switch (action.type) {
    case types.SAVE_WEBHOOK_REQUEST:
      return true;
    case types.SAVE_WEBHOOK_SUCCESS:
    case types.SAVE_WEBHOOK_FAIL:
      return false;
    default:
      return state;
  }
};

const isDeleting = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_WEBHOOK_REQUEST:
      return true;
    case types.DELETE_WEBHOOK_SUCCESS:
    case types.DELETE_WEBHOOK_FAIL:
      return false;
    default:
      return state;
  }
};

const activeId = (state = null, action) => {
  switch (action.type) {
    case types.DELETE_WEBHOOK_START:
    case types.SAVE_WEBHOOK_START:
      return action.webhookId;
    case types.DELETE_WEBHOOK_SUCCESS:
    case types.DELETE_WEBHOOK_FAIL:
    case types.DELETE_WEBHOOK_CANCEL:
    case types.SAVE_WEBHOOK_SUCCESS:
    case types.SAVE_WEBHOOK_FAIL:
    case types.SAVE_WEBHOOK_CANCEL:
      return null;
    default:
      return state;
  }
};

const isDeleteModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_WEBHOOK_START:
      return true;
    case types.DELETE_WEBHOOK_SUCCESS:
    case types.DELETE_WEBHOOK_FAIL:
    case types.DELETE_WEBHOOK_CANCEL:
      return false;
    default:
      return state;
  }
};

const isSaveModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.SAVE_WEBHOOK_START:
      return true;
    case types.SAVE_WEBHOOK_SUCCESS:
    case types.SAVE_WEBHOOK_FAIL:
    case types.SAVE_WEBHOOK_CANCEL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  activeId,
  isDeleteModalOpen,
  isSaveModalOpen,
  isFetching,
  isSaving,
  isDeleting
});

