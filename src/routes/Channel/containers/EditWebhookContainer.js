import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import EditWebhookModal from '../components/EditWebhookModal';
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

class EditWebhook extends Component {
  submitForm = ({url, webhookState, events}) => {
    const {channelId, webhookId, updateWebhook, onClose} = this.props;
    const webhook = {id: webhookId, url, webhookState, events, channelId, slug: 'transaction'};
    return new Promise(async (resolve, reject) => {
      await updateWebhook(webhook);
      onClose();
      resolve();
    });
  }

  render() {
    return <EditWebhookModal 
      onSubmit={this.submitForm} 
      {...this.props}
    />;
  }
}

const mapStateToProps = (state, props) => ({
  initialValues: {
    url: props.webhook.url,
    webhookState: props.webhook.webhookState,
    events: props.webhook.events,
  },
  isUpdating: selectors.getIsUpdatingWebhooks(state),
});

export default reduxForm({
  form: 'edit-webhook-form',
  fields: ['url', 'webhookState', 'events'],
  validate
}, mapStateToProps, actions)(EditWebhook);
