import * as types from './types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
import storage from 'store';

export const stateKey = 'activeChannel';

const defaultZapierToken = storage.get('zapier_api_token') || "";
const zapierToken = (state = defaultZapierToken, action) => {
  switch (action.type) {
    case types.FETCH_ZAPIER_TOKEN_SUCCESS:
      storage.set('zapier_api_token', action.data);
      return action.data;
    default:
      return state;
  }
};

const isFetchingZapierToken = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_ZAPIER_TOKEN_REQUEST:
      return true;
    case types.FETCH_ZAPIER_TOKEN_SUCCESS:
    case types.FETCH_ZAPIER_TOKEN_FAIL:
      return false;
    default:
      return state;
  }
};

const selectedPlatform = (state = 0, action) => {
  switch (action.type) {
    case types.UPDATE_SELECTED_PLATFORM:
      return action.data;
    default:
      return state;
  }
};

const webhookIds = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_WEBHOOKS_REQUEST:
      return [];
    case types.FETCH_WEBHOOKS_SUCCESS:
      return mergeArrays(state, action.ids);
    default:
      return state;
  }
};

const webhookById = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_WEBHOOKS_REQUEST:
      return {};
    case types.FETCH_WEBHOOKS_SUCCESS:
      return Object.assign({}, state, action.byId);
    default:
      return state;
  }
};

const isFetchingWebhooks = (state = false, action) => {
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

const isCreatingWebhooks = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_WEBHOOKS_REQUEST:
      return true;
    case types.CREATE_WEBHOOKS_SUCCESS:
    case types.CREATE_WEBHOOKS_FAIL:
      return false;
    default:
      return state;
  }
};

const isUpdatingWebhooks = (state = false, action) => {
  switch (action.type) {
    case types.UPDATE_WEBHOOKS_REQUEST:
      return true;
    case types.UPDATE_WEBHOOKS_SUCCESS:
    case types.UPDATE_WEBHOOKS_FAIL:
      return false;
    default:
      return state;
  }
};

const isDeletingWebhooks = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_WEBHOOKS_REQUEST:
      return true;
    case types.DELETE_WEBHOOKS_SUCCESS:
    case types.DELETE_WEBHOOKS_FAIL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  zapierToken,
  isFetchingZapierToken,
  selectedPlatform,
  webhookIds,
  webhookById,
  isFetchingWebhooks,
  isCreatingWebhooks,
  isUpdatingWebhooks,
  isDeletingWebhooks,
});

