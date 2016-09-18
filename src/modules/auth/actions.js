import Auth0Lock from 'auth0-lock';
import {getTokenExpirationDate} from 'lib/jwt';
import * as types from './types';
import {replace} from 'react-router-redux';
import storage from 'store';
import {addMessage} from 'modules/messages/actions';
import {fetchProfile, updateProfile} from 'modules/profile/actions';
import * as notifications from 'modules/notifications/actions';

const lock = new Auth0Lock(
  APP_CONFIG.auth0.clientID,
  APP_CONFIG.auth0.clientDomain
);

const scope = 'openid email';

export const unauth = () => ({
  type: types.UNAUTH
});

export const signOut = () => dispatch => {
  dispatch(unauth());
  dispatch(replace('/signin'));
  // dispatch(notifications.disconnect());
  storage.remove('profile');
  storage.remove('authToken');
  storage.remove('credentials');
  window.Intercom('shutdown');
};

export const fetchAWSCredentials = (token) => (
  new Promise((resolve, reject) => {
    const credentials = storage.get('credentials');
    if (credentials && new Date(credentials.Expiration) - new Date() > 300000) {
      return resolve(credentials);
    }
    const params = {
      id_token: token,
      api: 'aws',
      stage: __STAGE__
    };
    lock.$auth0.getDelegationToken(params, (error, data) => {
      if (error) return reject(error);
      storage.set('credentials', data.Credentials);
      return resolve(data.Credentials);
    });
  })
);

const bootIntercom = (profile) => {
  if (profile.impersonated || __DEV__) return;
  window.Intercom('boot', {
    app_id: APP_CONFIG.intercomID,
    ...profile,
    user_id: `Moneiv2|${profile.user_id}`,
    app: 'Monei v2'
  });
};

export const autoSignOut = (idToken) => {
  const token = idToken || storage.get('authToken');
  const delay = getTokenExpirationDate(token) - new Date() - 60000;
  return dispatch => {
    setTimeout(() => {
      dispatch(signOut());
    }, delay);
  };
};

export const showLock = () => {
  const lockOptions = {
    closable: false,
    container: 'lock-container',
    authParams: {scope},
    icon: `${APP_CONFIG.staticCdnURL}/logo.svg`
  };
  return dispatch => {
    lock.hide(() => lock.show(lockOptions, (error, profile, token) => {
      if (error) return;
      storage.set('profile', profile);
      storage.set('authToken', token);
      dispatch(updateProfile(profile));
      dispatch(finalizeAuth(profile, token));
      setTimeout(() => {
        dispatch({
          type: types.AUTH_SUCCESS
        });
        dispatch(replace('/'));
      });
    }));
  };
};

export const signInWithToken = (token) => {
  return async dispatch => {
    dispatch(signOut());
    storage.set('authToken', token);
    const profile = await dispatch(getTokenInfo(token));
    dispatch({
      type: types.AUTH_SUCCESS
    });
    dispatch(finalizeAuth(profile, token));
    dispatch(replace('/'));
  };
};

export const getTokenInfo = (idToken) => {
  const token = idToken || storage.get('authToken');
  return dispatch => {
    return new Promise((resolve, reject) => {
      lock.getClient().getProfile(token, (error, profile) => {
        if (error) reject(error);
        storage.set('profile', profile);
        dispatch(updateProfile(profile));
        resolve(profile);
      });
    });
  };
};

export const finalizeAuth = (profile, idToken) => {
  const token = idToken || storage.get('authToken');
  return dispatch => {
    // dispatch(fetchProfile());
    dispatch(autoSignOut(token));
    bootIntercom(profile);
    fetchAWSCredentials(token).then(
      // credentials => dispatch(notifications.connect(profile, credentials)),
      credentials => storage.set('credentials', credentials),
      error => dispatch(addMessage({text: error}))
    );
  };
};
