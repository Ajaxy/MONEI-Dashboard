import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {PAGE_LIMIT} from 'lib/constants';
import {getActiveUser} from 'routes/Users/modules/selectors';

const usersSelector = state => state[stateKey];
const defaultUserMetadata = {profile_type: 'individual'};

export const getUser = createSelector(
  getActiveUser,
  user => {
    user.user_metadata = Object.assign({}, defaultUserMetadata, user.user_metadata);
    return user;
  }
);

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
