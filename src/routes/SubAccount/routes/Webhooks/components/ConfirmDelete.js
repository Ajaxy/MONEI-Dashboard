import React, {PropTypes} from 'react';
import Confirm from 'components/Modal/Confirm';

const ConfirmDelete = ({isOpen, isDeleting, deleteWebhookCancel, deleteWebhook, webhook}) => (
  <Confirm
    isOpen={isOpen}
    isLoading={isDeleting}
    onCancel={deleteWebhookCancel}
    onConfirm={() => deleteWebhook(webhook.id)}
    confirmText="Delete"
    confirmClass="negative">
    <p>This action will completely delete a webhook with url - <b>{webhook.url}</b></p>
  </Confirm>
);

ConfirmDelete.propTypes = {
  webhook: PropTypes.object.isRequired,
  deleteWebhook: PropTypes.func.isRequired,
  deleteWebhookCancel: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default ConfirmDelete;
