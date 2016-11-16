import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const webhooksSelector = state => state[stateKey];

export const getWebhooks = createSelector(
  webhooksSelector,
  webhooks => webhooks.ids.map(id => webhooks.byId[id])
);

export const getWebhookIds = createSelector(
  webhooksSelector,
  webhooks => webhooks.ids
);

export const getIsUpToDate = createSelector(
  webhooksSelector,
  webhooks => webhooks.isUpToDate
);

export const getIsFetching = createSelector(
  webhooksSelector,
  webhooks => webhooks.isFetching
);

export const getIsSaving = createSelector(
  webhooksSelector,
  webhooks => webhooks.isSaving
);

export const getIsDeleting = createSelector(
  webhooksSelector,
  webhooks => webhooks.isDeleting
);
