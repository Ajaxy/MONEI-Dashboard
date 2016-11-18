import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {getActiveUser} from 'routes/Users/modules/selectors';

const userSelector = state => state[stateKey];
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
  userSelector,
  user => user.isFetching
);

export const getIsUpdating = createSelector(
  userSelector,
  user => user.isUpdating
);

export const getIsUpToDate = createSelector(
  userSelector,
  user => user.isUpToDate
);

export const getSubAccounts = createSelector(
  userSelector,
  user => user.subAccountIds.map(id => user.subAccountsById[id])
);

export const getIsSyncing = createSelector(
  userSelector,
  user => user.isSyncing
);

export const getIsFetchingSubAccounts = createSelector(
  userSelector,
  user => user.isFetchingSubAccounts
);
