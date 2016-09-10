import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {isEmpty} from 'lib/utils';
import base64 from 'base64-url';

const profileSelector = state => state[stateKey];

export const getIsFetching = createSelector(
  profileSelector,
  profile => profile.isFetching
);

export const getProfile = createSelector(
  profileSelector,
  profile => profile.data
);

export const getPaymentMethod = createSelector(
  getProfile,
  data => isEmpty(data.paymentMethod) ? undefined : data.paymentMethod
);

export const getIsFreeUser = createSelector(
  getProfile,
  data => data.plan === 'free'
);

export const getUserId = createSelector(
  getProfile,
  data => data.user_id
);

export const getUserIdBase64 = createSelector(
  getUserId,
  id => base64.encode(id)
);

export const getIsWaiting = createSelector(
  getProfile,
  data => data.plan === 'paid' && !data.approved
);
