import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import NewWebhookModal from '../components/NewWebhookModal';
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

class NewWebhook extends Component {
  submitForm = ({url, webhookState, events}) => {
    const {channelId, createWebhook, onClose} = this.props;
    const webhook = {url, webhookState, events, channelId, slug: 'transaction'};
    return new Promise(async (resolve, reject) => {
      await createWebhook(webhook);
      onClose();
      resolve();
    });
  }

  render() {
    return <NewWebhookModal onSubmit={this.submitForm} {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  isCreating: selectors.getIsCreatingWebhooks(state)
});

export default reduxForm({
  form: 'new-webhook-form',
  fields: ['url', 'webhookState', 'events'],
  validate
}, mapStateToProps, actions)(NewWebhook);
