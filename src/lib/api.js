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
    config.headers.smid = meta.smid;
    config.headers.smpwd = meta.smpwd;
    config.headers.smlogin = meta.smlogin;
    const credentials = storage.get('credentials');
    const signedConfig = signRequest(config, credentials)
    return signedConfig;
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

// Account

export const fetchAccount = () =>
  apiClient.get('account');

export const fetchCharges = (params = {}) =>
  apiClient.get('account/charges', {params});

export const updatePlan = ({plan, token, email}) =>
  apiClient.post('account/subscription', {plan, token, email});

export const updateCard = ({token, email}) =>
  apiClient.post('account/card', {token, email});

// Transactions

export const fetchTransactions = () =>
  apiClient.get('transactions');
