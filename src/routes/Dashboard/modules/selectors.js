import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {PAGE_LIMIT} from 'lib/constants';

const dashboardSelector = state => state[stateKey];
const activeCustomerIdSelector = state => state.router.params.customerId;
export const getDashboard = createSelector(
  dashboardSelector,
  dashboard => dashboard.ids.map(id => dashboard.byId[id]).slice(0, PAGE_LIMIT)
);

export const getCustomerIds = createSelector(
  dashboardSelector,
  dashboard => dashboard.ids
);

export const getIsFetching = createSelector(
  dashboardSelector,
  dashboard => dashboard.isFetching
);

export const getIsDeleting = createSelector(
  dashboardSelector,
  dashboard => dashboard.isDeleting
);

export const getIsCreating = createSelector(
  dashboardSelector,
  dashboard => dashboard.isCreating
);

export const getIsUpToDate = createSelector(
  dashboardSelector,
  dashboard => dashboard.isUpToDate
);

export const getPages = createSelector(
  dashboardSelector,
  dashboard => dashboard.pages
);

export const getActiveCustomer = createSelector(
  dashboardSelector,
  activeCustomerIdSelector,
  (dashboard, customerId) => dashboard.byId[customerId] || {}
);

export const getDeletingCustomer = createSelector(
  dashboardSelector,
  dashboard => dashboard.byId[dashboard.customerToDelete] || {}
);

export const getIsDeleteModalOpen = createSelector(
  dashboardSelector,
  dashboard => dashboard.isDeleteModalOpen
);
