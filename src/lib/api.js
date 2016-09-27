import axios from 'axios';
import storage from 'store';
import {omitInternalProps} from 'lib/utils';
import {signOut} from 'modules/auth/actions';
import {isTokenExpired} from 'lib/jwt';
import {signRequest} from 'lib/aws';

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
    config.headers.authToken = token;
    const profile = storage.get('profile');
    const meta = profile.app_metadata;
    if(config.sandbox) {
      config.headers.smid = meta.smid;
      config.headers.smpwd = meta.smpwd;
      config.headers.smlogin = meta.smlogin;
    }
    const credentials = storage.get('credentials');
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
};

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

// Transactions

export const fetchTransactions = () =>
  apiClient.get('transactions');

// Customers

export const fetchCustomers = ({page, order, filter, limit}) =>
  apiClient.get('customers', {params: {page, order, filter, limit}});
