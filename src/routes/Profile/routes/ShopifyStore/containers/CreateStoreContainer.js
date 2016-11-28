import {reduxForm} from 'redux-form';
import * as actions from '../../Settings/modules/actions';
import * as selectors from '../../Settings/modules/selectors';
import {getUserMetadata} from 'modules/profile/selectors';
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
    isUpdating: selectors.getIsUpdatingMetaData(state)
  };
};

export default reduxForm({
  form: 'createShopifyStore',
  fields: ['shopifyStoreName', 'shopifyStoreEmail'],
  validate
}, mapStateToProps, actions)(CreateStore);
