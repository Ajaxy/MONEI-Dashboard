import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {PAGE_LIMIT} from 'lib/constants';
import {getActiveUser} from 'routes/Users/modules/selectors';

const usersSelector = state => state[stateKey];

export const getUser = getActiveUser;

export const getAppMetadata = createSelector(
  getUser,
  user => user.app_metadata || {}
);

export const getUserMetadata = createSelector(
  getUser,
  user => user.user_metadata || {}
);

export const getIsFetching = createSelector(
  usersSelector,
  users => users.isFetching
);

export const getIsUpdating = createSelector(
  usersSelector,
  users => users.isUpdating
);

export const getIsUpToDate = createSelector(
  usersSelector,
  users => users.isUpToDate
);
