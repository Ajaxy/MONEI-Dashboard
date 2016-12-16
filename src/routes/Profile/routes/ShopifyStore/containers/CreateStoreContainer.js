import {reduxForm} from 'redux-form';
import * as actions from 'routes/Profile/modules/actions';
import * as selectors from 'routes/Profile/modules/selectors';
import {getUserMetadata, getIsUpdating} from 'modules/profile/selectors';
import {updateProfileMetaData} from 'modules/profile/actions';
import CreateStore from '../components/CreateStore';
import Validator from 'validatorjs';

const rules = {
  shopifyStoreEmail: 'required|email',
  shopifyStoreName: 'required'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const mapStateToProps = (state) => {
  return {
    initialValues: getUserMetadata(state),
    isOpen: selectors.getIsShopifyModalOpen(state),
    isUpdating: getIsUpdating(state)
  };
};

export default reduxForm({
  form: 'createShopifyStore',
  fields: ['shopifyStoreName', 'shopifyStoreEmail'],
  validate
}, mapStateToProps, {...actions, updateProfileMetaData})(CreateStore);
