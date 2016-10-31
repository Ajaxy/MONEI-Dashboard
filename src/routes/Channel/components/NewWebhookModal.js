import React, {PropTypes} from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import cx from 'classnames';

const NewWebhookModal = ({
  fields: {url, webhookState, events},
  handleSubmit,
  onSubmit,
  size, 
  style, 
  isOpen, 
  onClose,
  isCreating
}) => {
  return (
    <Modal
      {...{size, style, isOpen}}
    >
      <div className="header">Create webhook</div>
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
          disabled={isCreating} 
          onClick={onClose}>
          Cancel
        </Button>
        <Button 
          primary={true} 
          disabled={isCreating} 
          loading={isCreating} 
          className="green" 
          onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

NewWebhookModal.propTypes = {
  fields: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewWebhookModal;
