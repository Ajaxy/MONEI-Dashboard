import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {getActiveUser} from 'routes/Users/modules/selectors';

const userSelector = state => state[stateKey];

export const getUser = createSelector(
  getActiveUser,
  user => ({profileType: 'individual', ...user})
);

export const getIsVerificationRequested = createSelector(
  getUser,
  user => user.verificationStatus === 'pending'
);

export const getIsVerified = createSelector(
  getUser,
  user => user.verificationStatus === 'verified'
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

export const getFileUrl = createSelector(
  userSelector,
  user => user.fileUrl
);
