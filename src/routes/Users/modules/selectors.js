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

export const getParams = createSelector(
  usersSelector,
  users => users.params
);

export const getIsFirstPage = createSelector(
  getParams,
  pages => !pages.prevPage
);

export const getIsLastPage = createSelector(
  getParams,
  pages => !pages.nextPage
);
