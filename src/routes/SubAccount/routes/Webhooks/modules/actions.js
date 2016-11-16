import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/webhooks';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const fetchWebhooks = (channelId) => async dispatch => {
  dispatch({type: types.FETCH_WEBHOOKS_REQUEST});
  try {
    const data = await api.fetchWebhooks(channelId);
    const normalized = normalize(data.items, schema.arrayOfWebhooks);
    dispatch({
      type: types.FETCH_WEBHOOKS_SUCCESS,
      byId: normalized.entities.webhooks,
      ids: normalized.result
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

export const saveWebhookStart = () => ({
  type: types.SAVE_WEBHOOK_START,
});

export const saveWebhookCancel = () => ({
  type: types.SAVE_WEBHOOK_CANCEL
});

export const saveWebhook = (webhook) => async dispatch => {
  dispatch({type: types.SAVE_WEBHOOK_REQUEST});
  try {
    const data = await api[webhook.id ? 'updateWebhook' : 'saveWebhook'](webhook);
    const normalized = normalize(data, schema.webhook);
    dispatch({
      type: types.SAVE_WEBHOOK_SUCCESS,
      byId: normalized.entities.webhooks,
      ids: normalized.result
    });
  } catch (error) {
    dispatch({type: types.SAVE_WEBHOOK_FAIL});
    dispatch(addMessage({
      text: error,
      onRetry() {
        dispatch(createWebhook(webhook));
      }
    }));
  }
};

export const deleteWebhookStart = (webhookId) => ({
  type: types.DELETE_WEBHOOK_START,
  webhookId
});

export const deleteWebhookCancel = () => ({
  type: types.DELETE_WEBHOOK_CANCEL
});

export const deleteWebhook = (webhookId) => async dispatch => {
  dispatch({type: types.DELETE_WEBHOOK_REQUEST});
  try {
    const data = await api.deleteWebhook(webhookId);
    dispatch({
      type: types.DELETE_WEBHOOK_SUCCESS,
      webhookId
    });
  } catch (error) {
    dispatch({type: types.DELETE_WEBHOOK_FAIL});
    dispatch(addMessage({
      text: error,
      onRetry() {
        dispatch(deleteWebhook(webhookId));
      }
    }));
  }
};
