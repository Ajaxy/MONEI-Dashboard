import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const usersSelector = state => state[stateKey];
const activeUserIdSelector = state => state.route.params.userId;

export const getUsers = createSelector(
  usersSelector,
  users => users.ids.map(id => users.byId[id]).slice(0, users.page.lastItem)
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

export const getPage = createSelector(
  usersSelector,
  users => users.page || {}
);

export const getIsLastPage = createSelector(
  getPage,
  page => page.currentPage >= page.lastPage
);

export const getIsFirstPage = createSelector(
  getPage,
  page => page.currentPage == 1
);
