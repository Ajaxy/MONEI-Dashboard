import Auth0Lock from 'auth0-lock';
import {getTokenExpirationDate} from 'lib/jwt';
import {buildCreds} from 'lib/aws';
import * as types from './types';
import {replace} from 'react-router-redux';
import storage from 'store';
import * as actions from 'modules/profile/actions';
import {USER_ROLES} from 'lib/enums';
import logo from 'static/logo.svg';

const lock = new Auth0Lock(
  APP_CONFIG.auth0.clientID,
  APP_CONFIG.auth0.clientDomain
);

const scope = 'openid role mid mlogin mpwd acquirer';

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
  storage.remove('sandbox');
  window.Intercom('shutdown');
};

export const fetchAWSCredentials = (token) => {
  return new Promise((resolve, reject) => {
    const credentials = storage.get('credentials');
    if (credentials && new Date(credentials.Expiration) - new Date() > 300000) {
      buildCreds(credentials);
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
      buildCreds(data.Credentials);
      return resolve(data.Credentials);
    });
  });
};

const bootIntercom = (profile) => {
  if (
    profile.impersonated
    || profile.role !== USER_ROLES.User
    || __DEV__
    || __STAGE__ === 'development'
  ) {
    return;
  }
  window.Intercom('boot', {
    app_id: APP_CONFIG.intercomID,
    ...profile,
    user_id: `MONEI|${profile.user_id}`,
    app: 'MONEI'
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
    socialBigButtons: true,
    authParams: {scope},
    icon: logo
  };
  return dispatch => {
    lock.hide(() => lock.show(lockOptions, async(error, profile, token) => {
      if (error) return;
      dispatch({
        type: types.AUTH_REQUEST
      });
      storage.set('profile', profile);
      storage.set('authToken', token);
      dispatch(actions.updateProfileLocally(profile));
      await dispatch(finalizeAuth(profile, token));
      await dispatch(actions.initSandbox());
      dispatch({
        type: types.AUTH_SUCCESS
      });
      dispatch(replace('/'));
    }));
  };
};

export const signInWithToken = (token) => {
  return async dispatch => {
    dispatch(signOut());
    dispatch({
      type: types.AUTH_REQUEST
    });
    const newToken = await dispatch(resetToken(token));
    const profile = await dispatch(getTokenInfo(newToken));
    await dispatch(finalizeAuth(profile, newToken));
    await dispatch(actions.initSandbox());
    storage.set('authToken', newToken);
    dispatch({
      type: types.AUTH_SUCCESS
    });
    dispatch(replace('/'));
  };
};

export const resetToken = (token) => {
  return async dispatch => {
    return await new Promise((resolve, reject) => {
      const params = {
        api: 'auth0',
        id_token: token,
        scope
      };
      lock.$auth0.getDelegationToken(params, (error, data) => {
        if (error) return reject(error);
        storage.set('authToken', data.id_token);
        return resolve(data.id_token);
      });
    });
  };
};

export const getTokenInfo = (idToken) => {
  const token = idToken || storage.get('authToken');
  return async dispatch => {
    return await new Promise((resolve, reject) => {
      lock.getClient().getProfile(token, (error, profile) => {
        if (error) reject(error);
        storage.set('profile', profile);
        dispatch(actions.updateProfileLocally(profile));
        resolve(profile);
      });
    });
  };
};

export const finalizeAuth = (profile, idToken) => {
  const token = idToken || storage.get('authToken');
  return async dispatch => {
    bootIntercom(profile);
    dispatch(autoSignOut(token));
    await fetchAWSCredentials(token);
    const fetchedProfile = await dispatch(actions.fetchProfile());
    dispatch(actions.setSandboxMode(!fetchedProfile.mid))
  };
};

export const changePassword = (email, password) => {
  return new Promise((resolve, reject) => {
    lock.$auth0.changePassword({
      connection: 'Username-Password-Authentication',
      email,
      password
    }, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
