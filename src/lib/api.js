import axios from 'axios';
import storage from 'store';
import {omitInternalProps} from 'lib/utils';
import {signOut} from 'modules/auth/actions';
import {isTokenExpired} from 'lib/jwt';

const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseURL
});

export const addInterceptors = (store) => {
  apiClient.interceptors.request.use(config => {
    const token = storage.get('authToken');
    if (isTokenExpired(token)) {
      config.adapter = (resolve, reject) => reject({
        data: {
          message: 'Your session is expired. Please sign in again'
        }
      });
      store.dispatch(signOut());
    }
    if (!config.skipToken) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }, error => {
    return Promise.reject(error.data);
  });

  apiClient.interceptors.response.use(response => {
    return response.data;
  }, error => {
    if (error) {
      const errorMessage = error.data && error.data.message;
      return Promise.reject(errorMessage);
    }
  });
};

// Lists

export const fetchLists = (params = {}) =>
  apiClient.get('lists', {params});

export const fetchList = (listId, params = {}) =>
  apiClient.get(`lists/${listId}`, {params});

export const updateList = (listId, list) =>
  apiClient.patch(`lists/${listId}`, list);

export const deleteList = (listId) =>
  apiClient.delete(`lists/${listId}`);

export const createList = (list) =>
  apiClient.post('lists', list);

// Recipients

export const fetchRecipients = (listId, params = {}) =>
  apiClient.get(`lists/${listId}/recipients`, {params});

export const createRecipient = (listId, recipient) =>
  apiClient.post(`lists/${listId}/recipients`, recipient);

export const deleteRecipients = (listId, recipientIds = []) =>
  apiClient.delete(`lists/${listId}/recipients`, {
    params: {
      ids: recipientIds.join(',')
    }
  });

// Campaigns

export const fetchCampaigns = (params = {}) =>
  apiClient.get('campaigns', {params});

export const fetchCampaign = (campaignId, params = {}) =>
  apiClient.get(`campaigns/${campaignId}`, {params});

export const updateCampaign = (campaignId, campaign) =>
  apiClient.patch(`campaigns/${campaignId}`, omitInternalProps(campaign));

export const fetchCampaignReport = (campaignId) =>
  apiClient.get(`campaigns/${campaignId}/report`);

export const deleteCampaign = (campaignId) =>
  apiClient.delete(`campaigns/${campaignId}`);

export const createCampaign = (campaign) =>
  apiClient.post('campaigns', campaign);

export const sendCampaign = (campaignId, campaign) =>
  apiClient.post(`campaigns/${campaignId}/send`, omitInternalProps(campaign));

export const testCampaign = (campaignId, {subject, body, emails}) =>
  apiClient.post(`campaigns/${campaignId}/test`, {subject, body, emails});

export const duplicateCampaign = (campaignId) =>
  apiClient.post(`campaigns/${campaignId}/duplicate`, {});

// Senders

export const fetchSenders = (params = {}) =>
  apiClient.get('senders', {params});

export const createSender = (sender) =>
  apiClient.post('senders', sender);

export const verifySender = (senderId) =>
  apiClient.post(`senders/${senderId}/verify`, {});

export const updateSenderStatus = (senderId) =>
  apiClient.patch(`senders/${senderId}/update_status`, {});

// Account

export const fetchAccount = () =>
  apiClient.get('account');

export const fetchCharges = (params = {}) =>
  apiClient.get('account/charges', {params});

export const updatePlan = ({plan, token, email}) =>
  apiClient.post('account/subscription', {plan, token, email});

export const updateCard = ({token, email}) =>
  apiClient.post('account/card', {token, email});

// Templates

export const fetchTemplates = (params = {}) =>
  apiClient.get('templates', {params});

export const createTemplate = (template) =>
  apiClient.post('templates', template);

export const fetchTemplate = (templateId, params = {}) =>
  apiClient.get(`templates/${templateId}`, {params});

export const deleteTemplate = (templateId) =>
  apiClient.delete(`templates/${templateId}`);

export const updateTemplate = (templateId, template) =>
  apiClient.patch(`templates/${templateId}`, omitInternalProps(template));

export const duplicateTemplate = (templateId) =>
  apiClient.post(`templates/${templateId}/duplicate`, {});

export const fetchEditorToken = () =>
  apiClient.get('templates/token');

export default apiClient;

