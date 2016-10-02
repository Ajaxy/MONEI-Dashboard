import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const dashboardSelector = state => state[stateKey];

export const getAmountPerDay = createSelector(
  dashboardSelector,
  dashboard => dashboard.amountPerDay
);

export const getCountPerDay = createSelector(
  dashboardSelector,
  dashboard => dashboard.countPerDay
);

export const getTotalAmount = createSelector(
  dashboardSelector,
  dashboard => dashboard.totalAmount
);

export const getTotalCount = createSelector(
  dashboardSelector,
  dashboard => dashboard.totalCount
);

export const getStartDate = createSelector(
  dashboardSelector,
  dashboard => dashboard.startDate
);

export const getEndDate = createSelector(
  dashboardSelector,
  dashboard => dashboard.endDate
);

export const getLabels = createSelector(
  dashboardSelector,
  dashboard => dashboard.labels
);

export const getIsFetching = createSelector(
  dashboardSelector,
  dashboard => dashboard.isFetching
);
