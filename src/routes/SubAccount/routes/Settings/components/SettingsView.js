import React, {PropTypes} from 'react';
import SettingsForm from '../containers/SettingsFormContainer';

const SettingsView = ({
  updateSubAccount,
  subAccountId,
  isUpdating,
  subAccount
}) => {
  const submit = (formProps) => {
    updateSubAccount(subAccountId, formProps);
  };
  return (
    <section className="ui vertical segment">
      <SettingsForm
        onFormSubmit={submit}
        isDisabled={subAccount.bankAccountStatus === 'pending'}
        isLoading={isUpdating}
        initialValues={subAccount} />
    </section>
  );
};

SettingsView.propTypes = {
  subAccount: PropTypes.object.isRequired,
  updateSubAccount: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  subAccountId: PropTypes.string.isRequired,
};

export default SettingsView;
