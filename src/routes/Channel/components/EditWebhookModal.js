import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import cx from 'classnames';
import Modal from 'components/Modal';
import Button from 'components/Button';

const EditWebhookModal = ({
  fields: {url, webhookState, events},
  size, 
  style, 
  isOpen, 
  handleSubmit, 
  onSubmit, 
  onClose, 
  isUpdating
}) => {
  return (
    <Modal size="small" style="standard" isOpen={true}>
      <div className="header">Edit webhook</div>
      <div className="content">
        <form className="ui form large">
          <Input {...url} type="text" name="url" placeholder="URL" label="URL"/>
          <Select
            {...webhookState}
            label="Status"
            name="webhookState"
            search>
            <SelectItem value="ACTIVE">active</SelectItem>
            <SelectItem value="NOT_ACTIVE">not active</SelectItem>
          </Select>
          <Select
            {...events}
            label="Events"
            name="events"
            multiple={true}
            search>
            <SelectItem value="transaction.created">new transaction</SelectItem>
            <SelectItem value="transaction.updated">transaction update</SelectItem>
          </Select>
        </form>
      </div>
      <div className="actions">
        <Button 
          disabled={isUpdating} 
          onClick={onClose}>
          Cancel
        </Button>
        <Button 
          primary={true} 
          disabled={isUpdating} 
          loading={isUpdating} 
          className="green" 
          onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

EditWebhookModal.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default EditWebhookModal;
