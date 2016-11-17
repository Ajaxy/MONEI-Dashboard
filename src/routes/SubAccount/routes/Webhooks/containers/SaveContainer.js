import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import SaveModal from '../components/SaveModal';
import * as selectors from '../modules/selectors';
import Validator from 'validatorjs';

const rules = {
  url: 'url',
  webhookState: 'required',
  events: 'required'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const mapStateToProps = (state, props) => {
  const webhook = selectors.getActiveWebhook(state);
  return {
    webhook: {
      ...webhook,
      channelId: props.subAccountId,
      slug: 'transaction'
    },
    initialValues: webhook,
    isOpen: selectors.getIsSaveModalOpen(state),
    isSaving: selectors.getIsSaving(state)
  }
};

export default reduxForm({
  form: 'webhook-form',
  fields: ['url', 'webhookState', 'events'],
  validate
}, mapStateToProps, actions)(SaveModal);
