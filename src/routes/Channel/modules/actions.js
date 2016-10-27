import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/webhooks';
import {fetchChannels} from 'routes/Channels/modules/actions';
import {copyTextToClipboard} from 'lib/utils';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const fetchChannel = () => {
  return async dispatch => {
    return await dispatch(fetchChannels());
  };
};

export const fetchWebhooks = (channelId) => {
  return async dispatch => {
    dispatch({type: types.FETCH_WEBHOOKS_REQUEST});
    try {
      const data = await api.fetchWebhooks(channelId);
      const normalized = normalize(data.items, schema.arrayOfWebhooks);
      dispatch({
        type: types.FETCH_WEBHOOKS_SUCCESS,
        byId: normalized.entities.transactions,
        ids: normalized.result,
      });
    } catch (error) {
      dispatch({type: types.FETCH_WEBHOOKS_FAIL});
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchWebhooks(channelId));
        }
      }));
    }
  };
};

export const createZapierToken = (channelId) => {
  return async dispatch => {
    dispatch({type: types.FETCH_ZAPIER_TOKEN_REQUEST});
    try {
      const token = await api.createZapierApiToken(channelId);
      dispatch({
        type: types.FETCH_ZAPIER_TOKEN_SUCCESS,
        data: token
      });
    } catch (error) {
      dispatch({type: types.FETCH_ZAPIER_TOKEN_FAIL});
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(createZapierToken(channelId));
        }
      }));
    }
  }
};

export const copy = (text, name) => dispatch => {
  copyTextToClipboard(text);
  dispatch(addMessage({
    text: `${name} copied to clipboard`,
    style: "success",
  }));
};

export const selectPlatform = (platform) => ({
  type: types.UPDATE_SELECTED_PLATFORM,
  data: platform
});

export const showNewMessage = () => dispatch => {
  window.Intercom('showNewMessage');
};