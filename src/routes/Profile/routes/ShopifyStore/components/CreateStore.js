import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import Confirm from 'components/Modal/Confirm';

const CreateStore = ({
  isOpen,
  isUpdating,
  fields: {shopifyStoreName, shopifyStoreEmail},
  handleSubmit,
  updateUserMetaData,
  createShopifyStoreCancel,
  invalid,
  resetForm
}) => {
  const onSubmit = async(formData) => {
    await updateUserMetaData(formData);
    resetForm();
  };
  return (
    <Confirm
      isOpen={isOpen}
      isLoading={isUpdating}
      isDisabled={invalid}
      onCancel={createShopifyStoreCancel}
      onConfirm={handleSubmit(onSubmit)}
      headerText="Request your free Shopify store"
      confirmText="Submit"
      confirmClass="positive">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Input {...shopifyStoreName} label="What name should have your Shopify store?" />
        <Input {...shopifyStoreEmail} label="What email should be the store owner?" />
      </form>
    </Confirm>
  );
};

CreateStore.propTypes = {
  fields: PropTypes.object.isRequired,
  updateUserMetaData: PropTypes.func.isRequired,
  createShopifyStoreCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default CreateStore;
