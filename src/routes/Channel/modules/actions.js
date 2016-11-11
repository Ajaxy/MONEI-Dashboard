import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/webhooks';
import {fetchChannels} from '../../SubAccounts/modules/actions';
import {copyTextToClipboard} from 'lib/utils';
import {addMessage} from 'modules/messages/actions';
import {showModal} from 'modules/modals/actions';
import {normalize} from 'normalizr';
import NewWebhook from '../containers/NewWebhookContainer';
import EditWebhook from '../containers/EditWebhookContainer';
import ConfirmDeleteWebhook from '../containers/ConfirmDeleteWebhookContainer';

export const fetchChannel = () => async dispatch => {
  return await dispatch(fetchChannels());
};

export const createZapierToken = (channelId) => async dispatch => {
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
};

export const copy = (text, name) => dispatch => {
  copyTextToClipboard(text);
  dispatch(addMessage({
    text: `${name} copied to clipboard`,
    style: 'success'
  }));
};

export const selectPlatform = (platform) => ({
  type: types.UPDATE_SELECTED_PLATFORM,
  data: platform
});

export const showNewMessage = () => dispatch => {
  window.Intercom('showNewMessage');
};

export const showCreateWebhook = (channelId) => dispatch => {
  dispatch(showModal(NewWebhook, {channelId}));
};

export const showEditWebhook = (channelId, webhookId, webhook) => dispatch => {
  dispatch(showModal(EditWebhook, {channelId, webhookId, webhook}));
};

export const showDeleteWebhook = (webhookId) => dispatch => {
  dispatch(showModal(ConfirmDeleteWebhook, {webhookId}));
};

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

export const createWebhook = (webhook) => async dispatch => {
  dispatch({type: types.CREATE_WEBHOOKS_REQUEST});
  try {
    const data = await api.saveWebhook(webhook);
    const normalized = normalize(data, schema.webhook);
    dispatch({
      type: types.CREATE_WEBHOOKS_SUCCESS,
      byId: normalized.entities.webhooks,
      ids: normalized.result
    });
  } catch (error) {
    dispatch({type: types.CREATE_WEBHOOKS_FAIL});
    dispatch(addMessage({
      text: error,
      onRetry() {
        dispatch(createWebhook(webhook));
      }
    }));
  }
};

export const updateWebhook = (webhook) => async dispatch => {
  dispatch({type: types.UPDATE_WEBHOOKS_REQUEST});
  try {
    const data = await api.updateWebhook(webhook);
    const normalized = normalize(data, schema.webhook);
    dispatch({
      type: types.UPDATE_WEBHOOKS_SUCCESS,
      byId: normalized.entities.webhooks,
      ids: normalized.result
    });
  } catch (error) {
    dispatch({type: types.UPDATE_WEBHOOKS_FAIL});
    dispatch(addMessage({
      text: error,
      onRetry() {
        dispatch(updateWebhook(webhook));
      }
    }));
  }
};

export const deleteWebhook = (webhookId) => async dispatch => {
  dispatch({type: types.DELETE_WEBHOOKS_REQUEST});
  try {
    const data = await api.deleteWebhook(webhookId);
    dispatch({
      type: types.DELETE_WEBHOOKS_SUCCESS,
      webhookId
    });
  } catch (error) {
    dispatch({type: types.DELETE_WEBHOOKS_FAIL});
    dispatch(addMessage({
      text: error,
      onRetry() {
        dispatch(deleteWebhook(webhookId));
      }
    }));
  }
};
