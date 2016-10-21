import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const onboardingSelector = state => state[stateKey];

export const getStep = createSelector(
  onboardingSelector,
  onboarding => onboarding.step
);

export const getPercentage = createSelector(
  onboardingSelector,
  onboarding => onboarding.percentage
);

export const getIsConfirmDeleteOpen = createSelector(
  onboardingSelector,
  onboarding => onboarding.isConfirmDeleteOpen
);

export const getIsConfirmRegisterOpen = createSelector(
  onboardingSelector,
  onboarding => onboarding.isConfirmRegisterOpen
);

export const getIsUploading = createSelector(
  onboardingSelector,
  onboarding => onboarding.isUploading
);

export const getIsDeleting = createSelector(
  onboardingSelector,
  onboarding => onboarding.isDeleting
);

export const getDocumentUrl = createSelector(
  onboardingSelector,
  onboarding => onboarding.documentUrl
);