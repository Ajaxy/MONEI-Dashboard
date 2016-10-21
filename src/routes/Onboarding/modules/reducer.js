import * as types from './types';
import * as profileTypes from 'modules/profile/types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'onboarding';

const getOnboardingStepFromProfile = (profile) => {
  let nextStep = 0;
  const userMetadata = profile.user_metadata || {};
  const appMetadata = profile.app_metadata || {};
  if(userMetadata.name && userMetadata.profile_type && userMetadata.country && appMetadata.phone_number)
    nextStep = 1;
  if(userMetadata.document_name && (
    (userMetadata.profile_type == 'company' && userMetadata.company_name && userMetadata.vat_number) || 
    (userMetadata.profile_type == 'individual' && userMetadata.id_number)))
    nextStep = 2;
  return nextStep;
};

const getOnboardingPercentage = (profile) => {
  let percentage = 0;
  const userMetadata = profile.user_metadata || {};
  const appMetadata = profile.app_metadata || {};
  if(userMetadata.name && userMetadata.profile_type && userMetadata.country && appMetadata.phone_number)
    percentage = 40;
  if(userMetadata.document_name && (
    (userMetadata.profile_type == 'company' && userMetadata.company_name && userMetadata.vat_number) || 
    (userMetadata.profile_type == 'individual' && userMetadata.id_number)))
    percentage = 70;
  if(userMetadata.store_url && userMetadata.store_goods)
    percentage = 90;
  if(userMetadata.country == "Spain" && userMetadata.acquirer)
    percentage = 100;
  if(userMetadata.country != "Spain" && userMetadata.iban)
    percentage = 100;
  if(userMetadata.acquirer == "BBVA" && userMetadata.acquirer_office)
    percentage = 100;
  return percentage;
};

const step = (state = 0, action) => {
  switch(action.type) {
    case types.ONBOARDING_UPDATE_STEP:
      return getOnboardingStepFromProfile(action.data);
    case types.ONBOARDING_NEXT_STEP:
      return state + 1;
    case types.ONBOARDING_PREV_STEP:
      return state - 1;
    default:
      return state;
  }
};

const percentage = (state = 0, action) => {
  switch(action.type) {
    case types.ONBOARDING_UPDATE_STEP:
    case types.ONBOARDING_NEXT_STEP:
    case types.ONBOARDING_PREV_STEP:
      return getOnboardingPercentage(action.data);
    default:
      return state;
  }
};

const isConfirmDeleteOpen = (state = false, action) => {
  switch (action.type) {
    case types.ONBOARDING_CONFIRM_DELETE_START:
      return true;
    case types.ONBOARDING_CONFIRM_DELETE_END:
      return false;
    default:
      return state;
  }
};

const isConfirmRegisterOpen = (state = false, action) => {
  switch (action.type) {
    case types.ONBOARDING_CONFIRM_REGISTER_START:
      return true;
    case types.ONBOARDING_CONFIRM_REGISTER_END:
      return false;
    default:
      return state;
  }
};

const isUploading = (state = false, action) => {
  switch (action.type) {
    case types.ONBOARDING_UPLOAD_FILE_START:
      return true;
    case types.ONBOARDING_UPLOAD_FILE_END:
      return false;
    default:
      return state;
  }
};

const isDeleting = (state = false, action) => {
  switch (action.type) {
    case types.ONBOARDING_DELETE_FILE_START:
      return true;
    case types.ONBOARDING_DELETE_FILE_END:
      return false;
    default:
      return state;
  }
}

const documentUrl = (state = "", action) => {
  switch (action.type) {
    case types.ONBOARDING_UPDATE_FILE_URL:
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({
  step,
  percentage,
  documentUrl,
  isConfirmDeleteOpen,
  isConfirmRegisterOpen,
  isUploading,
  isDeleting,
});

