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

export const getPages = createSelector(
  usersSelector,
  users => users.pages
);

export const getIsFirstPage = createSelector(
  getPages,
  pages => !pages.prevPage
);

export const getIsLastPage = createSelector(
  getPages,
  pages => !pages.nextPage
);
