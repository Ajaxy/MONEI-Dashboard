import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const usersSelector = state => state[stateKey];
const activeUserIdSelector = state => state.route.params.userId;

export const getUsers = createSelector(
  usersSelector,
  users => users.ids.map(id => users.byId[id])
);

export const getUserIds = createSelector(
  usersSelector,
  users => users.ids
);

export const getActiveUser = createSelector(
  usersSelector,
  activeUserIdSelector,
  (users, userId) => users.byId[userId] || {}
);

export const getIsFetching = createSelector(
  usersSelector,
  users => users.isFetching
);

export const getQueryParams = createSelector(
  usersSelector,
  users => users.queryParams
);

export const getIsFirstPage = createSelector(
  getQueryParams,
  params => !params.prevPage
);

export const getIsLastPage = createSelector(
  getQueryParams,
  params => !params.nextPage
);
