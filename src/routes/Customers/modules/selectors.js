import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {PAGE_LIMIT} from 'lib/constants';

const customersSelector = state => state[stateKey];
const activeCustomerIdSelector = state => state.router.params.customerId;
export const getCustomers = createSelector(
  customersSelector,
  customers => customers.ids.map(id => customers.byId[id]).slice(0, PAGE_LIMIT)
);

export const getCustomerIds = createSelector(
  customersSelector,
  customers => customers.ids
);

export const getIsFetching = createSelector(
  customersSelector,
  customers => customers.isFetching
);

export const getIsDeleting = createSelector(
  customersSelector,
  customers => customers.isDeleting
);

export const getIsCreating = createSelector(
  customersSelector,
  customers => customers.isCreating
);

export const getIsUpToDate = createSelector(
  customersSelector,
  customers => customers.isUpToDate
);

export const getPages = createSelector(
  customersSelector,
  customers => customers.pages
);

export const getActiveCustomer = createSelector(
  customersSelector,
  activeCustomerIdSelector,
  (customers, customerId) => customers.byId[customerId] || {}
);

export const getDeletingCustomer = createSelector(
  customersSelector,
  customers => customers.byId[customers.customerToDelete] || {}
);

export const getIsDeleteModalOpen = createSelector(
  customersSelector,
  customers => customers.isDeleteModalOpen
);
