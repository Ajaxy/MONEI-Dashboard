import {createSelector} from 'reselect';
import {stateKey} from './reducer';
import {getActiveSubAccount} from '../../SubAccounts/modules/selectors';

const channelSelector = state => state[stateKey];
export const getChannel = getActiveSubAccount;

export const getZapierToken = createSelector(
  channelSelector,
  channel => channel.zapierToken
);

export const getIsFetchingZapierToken = createSelector(
  channelSelector,
  channel => channel.isFetching
);

export const getSelectedPlatform = createSelector(
  channelSelector,
  channel => channel.selectedPlatform
);

export const getWebhooks = createSelector(
  channelSelector,
  channel => channel.webhookIds.map(id => channel.webhookById[id])
);

export const getWebhookIds = createSelector(
  channelSelector,
  channel => channel.webhookIds
);

export const getIsFetchingWebhooks = createSelector(
  channelSelector,
  channel => channel.isFetchingWebhooks
);

export const getIsCreatingWebhooks = createSelector(
  channelSelector,
  channel => channel.isCreatingWebhooks
);

export const getIsUpdatingWebhooks = createSelector(
  channelSelector,
  channel => channel.isUpdatingWebhooks
);

export const getIsDeletingWebhooks = createSelector(
  channelSelector,
  channel => channel.isDeletingWebhooks
);
