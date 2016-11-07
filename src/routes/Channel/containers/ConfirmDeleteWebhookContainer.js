import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import ConfirmDeleteWebhook from '../components/ConfirmDeleteWebhook';

class ConfirmDelete extends Component {
  deleteWebhook = ({url, webhookState, events}) => {
    const {webhookId, deleteWebhook, onClose} = this.props;
    return new Promise(async (resolve, reject) => {
      await deleteWebhook(webhookId);
      onClose();
      resolve();
    });
  }

  render() {
    return <ConfirmDeleteWebhook
      onDelete={this.deleteWebhook}
      {...this.props}
    />;
  }
}

const mapStateToProps = (state, props) => ({
  isDeleting: selectors.getIsDeletingWebhooks(state)
});

export default connect(mapStateToProps, actions)(ConfirmDelete);
