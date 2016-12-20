import axios from 'axios';
import storage from 'store';
import {getProfile, getIsInSandboxMode} from 'modules/profile/selectors';
import {signOut} from 'modules/auth/actions';
import {isTokenExpired} from 'lib/jwt';

const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseURL
});

const authApiClient = axios.create({
  baseURL: APP_CONFIG.auth0.baseURL
});

export const addInterceptors = (store) => {
  apiClient.interceptors.request.use(config => {
    // encode url in case of unsupported symbols
    config.url = encodeURI(config.url);

    const token = storage.get('authToken');
    const state = store.getState();
    const profile = getProfile(state);
    const isInSandboxMode = getIsInSandboxMode(state);
    const idKey = isInSandboxMode ? 'smid' : 'mid';
    if (isTokenExpired(token)) {
      config.adapter = (resolve, reject) => reject({
        data: {
          message: 'Your session is expired. Please sign in again'
        }
      });
      store.dispatch(signOut());
    }
    config.headers.authToken = token;
    config.headers.sandbox = isInSandboxMode;
    config.headers[idKey] = profile[idKey];
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

  authApiClient.interceptors.request.use(config => {
    const token = storage.get('authToken');
    if (!token) return config;

    if (isTokenExpired(token)) {
      config.adapter = (resolve, reject) => reject({
        data: {
          message: 'Your session is expired. Please sign in again'
        }
      });
      store.dispatch(signOut());
    }
    config.headers['Authorization'] = `Bearer ${token}`;
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
};

// Sandbox

export const createSandbox = (name) =>
  apiClient.post('sandbox', {name});

// Transactions

export const fetchTransactions = (params = {}) =>
  apiClient.get('transactions/stored', {params});

export const fetchTransactionStats = () =>
  apiClient.get('transactions/stats');

// Customers

export const fetchCustomers = (params = {}) =>
  apiClient.get('customers', {params});

export const fetchCustomer = (customerId) =>
  apiClient.get(`customers/${customerId}`);

export const fetchCustomerTransactions = (customerId, params = {}) =>
  apiClient.get(`customers/${customerId}/transactions`, {params});

// Users

export const fetchUsers = (params = {}) =>
  apiClient.get('stored-users', {params});

export const fetchUser = (userId) =>
  apiClient.get(`stored-users/${userId}`);

export const updateUser = (userId, data = {}) =>
  apiClient.patch(`stored-users/${userId}`, data);

export const verifyUser = (userId) =>
  apiClient.patch(`stored-users/${userId}/verify`, {});

export const impersonateUser = (userId, {redirect_uri}) =>
  apiClient.post(`users/${userId}/impersonate`, {redirect_uri});

export const updateUserMetaData = (userId, data) =>
  authApiClient.patch(`users/${userId}`, {user_metadata: data});

export const syncUser = (userId, {mid, smid}) =>
  apiClient.post(`users/${userId}/sync`, {mid, smid});

export const fetchUserSubAccounts = (userId) =>
  apiClient.get(`users/${userId}/sub-accounts`);

export const updateUserSubAccount = (userId, subAccountId, data) =>
  apiClient.patch(`users/${userId}/sub-accounts/${subAccountId}`, data);

export const confirmUserBankAccount = (userId, subAccountId) =>
  apiClient.post(`users/${userId}/sub-accounts/${subAccountId}/confirm-bank-account`);

export const fetchUserBankAccounts = (userId) =>
  apiClient.get(`users/${userId}/bank-accounts`);

// Sub Accounts

export const fetchSubAccounts = () =>
  apiClient.get('sub-accounts');

export const updateSubAccount = (subAccountId, data = {}) =>
  apiClient.patch(`sub-accounts/${subAccountId}`, data);

export const createZapierApiToken = (channelId) =>
  apiClient.post('zapier/token/create', {channelId, slug: 'transaction', events: ['transaction.all']});

// Webhooks

export const fetchWebhooks = (channelId) =>
  apiClient.get('webhooks', {params: {channelId, slug: 'transaction'}});

export const createWebhook = (webhook) =>
  apiClient.post('webhooks', webhook);

export const updateWebhook = (webhook) =>
  apiClient.patch(`webhooks/${webhook.id}`, webhook);

export const deleteWebhook = (webhookId) =>
  apiClient.delete(`webhooks/${webhookId}`);

// Account

export const fetchAccount = () =>
  apiClient.get('account');

export const updateAccount = (data = {}) =>
  apiClient.patch('account', data);

export const requestAccountVerification = (data = {}) =>
  apiClient.post('account/request-verification', data);

export const fetchBankAccounts = () =>
  apiClient.get('account/bank-accounts');

export const createBankAccount = (data = {}) =>
  apiClient.post('account/bank-accounts', data);

export const updateBankAccount = (bankAccount) =>
  apiClient.patch(`account/bank-accounts/${bankAccount.id}`, bankAccount);

export const deleteBankAccount = (accountId) =>
  apiClient.delete(`account/bank-accounts/${accountId}`);

// Phone verification

export const phoneVerificationStart = ({phoneNumber}) =>
  apiClient.post('phone-verification/start', {phoneNumber});

export const phoneVerificationCheck = ({phoneNumber, verificationCode}) =>
  apiClient.post('account/phone-verification/check', {phoneNumber, verificationCode});
