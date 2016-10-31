import axios from 'axios';
import storage from 'store';
import {omitInternalProps} from 'lib/utils';
import {signOut} from 'modules/auth/actions';
import {isTokenExpired} from 'lib/jwt';
import {buildCreds, signRequest} from 'lib/aws';

const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseURL
});

const authApiClient = axios.create({
  baseURL: APP_CONFIG.auth0.baseURL
});

export const addInterceptors = (store) => {
  apiClient.interceptors.request.use(config => {
    const token = storage.get('authToken');
    const profile = storage.get('profile');
    const credentials = storage.get('credentials');

    // at this point, user is not yet finished authentication
    if(!token || !profile || !credentials) {
      return config;
    }

    if (isTokenExpired(token)) {
      config.adapter = (resolve, reject) => reject({
        data: {
          message: 'Your session is expired. Please sign in again'
        }
      });
      store.dispatch(signOut());
    }
    config.headers.authToken = token;

    const meta = profile ? profile.app_metadata : {};
    if(config.sandbox) {
      config.headers.smid = meta.smid;
      config.headers.smpwd = meta.smpwd;
      config.headers.smlogin = meta.smlogin;
    }
    return signRequest(config, credentials);
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

  authApiClient.interceptors.request.use(config => {
    const token = storage.get('authToken');
    if(!token) return config;

    if(isTokenExpired(token)) {
      config.adapter = (resolve, reject) => reject({
        data: {
          message: 'Your session is expired. Please sign in again'
        }
      });
      store.dispatch(signOut());
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, error => {
    return Promise.reject(error.data);
  });

  authApiClient.interceptors.response.use(response => {
    return response.data;
  }, error => {
    if (error) {
      const errorMessage = error.data && error.data.message;
      return Promise.reject(errorMessage);
    }
  });

  // update AWS creds
  const credentials = storage.get('credentials');
  if (credentials) buildCreds(credentials);
};

// Sandbox

export const createSandbox = (name) =>
  apiClient.post('sandbox', {name});

// Transactions

export const fetchTransactions = ({from, to, page}, sandbox) =>
  apiClient.get('transactions/stored', {params: {from, to, page}, sandbox});

export const fetchTransactionStats = (sandbox) =>
  apiClient.get('transactions/stats', {sandbox});

// Customers

export const fetchCustomers = ({page, order, filter, limit}, sandbox) =>
  apiClient.get('customers', {params: {page, order, filter, limit}, sandbox});

// Users

export const fetchUsers = ({limit = 50, page = 1, filter = null}) =>
  apiClient.get('users', {params: {limit, page, filter}});

export const fetchUser = (userId) =>
  apiClient.get(`users/${userId}`);

export const updateUser = (userId, {app_metadata, user_metadata}) =>
  apiClient.patch(`users/${userId}`, {app_metadata, user_metadata});

export const verifyUser = (userId) =>
  apiClient.patch(`users/${userId}/verify`, {});

export const impersonateUser = (userId, {redirect_uri}) =>
  apiClient.post(`users/${userId}/impersonate`, {redirect_uri});

// Profile

export const updateProfile = (userId, {user_metadata}) => 
  authApiClient.patch(`users/${userId}`, {user_metadata});

// Channels

export const fetchChannels = (sandbox) => 
  apiClient.get('channels', {sandbox});

export const createZapierApiToken = (channelId) =>
  apiClient.post('zapier/token/create', {channelId, slug: 'transaction', events: ['transaction.all']})

// Webhooks

export const fetchWebhooks = (channelId) =>
  apiClient.get('webhooks', {params: {channelId, slug: 'transaction'}})

export const saveWebhook = (webhook) =>
  apiClient.post('webhooks', {...webhook})

export const updateWebhook = (webhook) =>
  apiClient.patch(`webhooks/${webhook.id}`, {...webhook})

export const deleteWebhook = (webhookId) =>
  apiClient.delete(`webhooks/${webhookId}`)

// Phone verification

export const verifyPhoneStart = (phoneNumber) => 
  apiClient.post('phone-verification/start', {phoneNumber});

export const verifyPhoneCheck = (phoneNumber, verificationCode) =>
  apiClient.post('phone-verification/check', {phoneNumber, verificationCode});