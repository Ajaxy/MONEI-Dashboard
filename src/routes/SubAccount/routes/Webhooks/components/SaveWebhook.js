import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import Confirm from 'components/Modal/Confirm';

const SaveWebhook = ({
  isOpen,
  isSaving,
  fields: {url, webhookState, events},
  handleSubmit,
  saveWebhookCancel,
  saveWebhook,
  webhook,
  invalid,
  resetForm
}) => {
  const onSubmit = async(formData) => {
    await saveWebhook({...webhook, ...formData});
    resetForm();
  };
  const onCancel = () => {
    saveWebhookCancel();
    resetForm();
  };
  return (
    <Confirm
      isOpen={isOpen}
      isLoading={isSaving}
      isDisabled={invalid}
      onCancel={onCancel}
      onConfirm={handleSubmit(onSubmit)}
      headerText={webhook.id ? 'Edit' : 'Create' + ' webhook'}
      confirmText="Save"
      confirmClass="positive">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Input {...url} />
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
          multiple>
          <SelectItem value="transaction.created">transaction created</SelectItem>
          <SelectItem value="transaction.updated">transaction updated</SelectItem>
        </Select>
      </form>
    </Confirm>
  );
};

SaveWebhook.propTypes = {
  webhook: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  saveWebhook: PropTypes.func.isRequired,
  saveWebhookCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default SaveWebhook;
