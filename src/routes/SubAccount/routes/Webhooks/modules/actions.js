import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/webhooks';
import {getIsUpToDate} from './selectors';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const fetchWebhooks = (subAccountId) => {
  return async (dispatch, getState) => {
    const isUpToDate = getIsUpToDate(getState());
    if (isUpToDate) return;
    dispatch({type: types.FETCH_WEBHOOKS_REQUEST});
    try {
      const data = await api.fetchWebhooks(subAccountId);
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
          dispatch(fetchWebhooks(subAccountId));
        }
      }));
    }
  };
};

export const saveWebhookStart = (webhookId) => ({
  type: types.SAVE_WEBHOOK_START,
  webhookId
});

export const saveWebhookCancel = () => ({
  type: types.SAVE_WEBHOOK_CANCEL
});

export const saveWebhook = (webhook) => async dispatch => {
  dispatch({type: types.SAVE_WEBHOOK_REQUEST});
  try {
    const webhook = await api[webhook.id ? 'updateWebhook' : 'createWebhook'](webhook);
    const normalized = normalize(webhook, schema.webhook);
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
