import React, {Component, PropTypes} from 'react';
import StoresView from '../components/StoresView';
import ConfirmRegisterView from '../components/ConfirmRegisterView';
import Loader from 'components/Loader';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import * as _iban from 'iban';
import {isUrlValid} from 'lib/utils';
import {USER_ACQUIRERS} from 'lib/enums';

class StoresForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  submitForm = ({store_url, store_goods, iban, acquirer, acquirer_office}) => {
    const {user, country, updateStep, updateProfile, openConfirmRegisterModal} = this.props;
    return new Promise(async (resolve, reject) => {
      if(!isUrlValid(store_url)) {
        return reject({store_url: "Please enter valid url"});
      }
      if(country != 'Spain' && !_iban.isValid(iban)) {
        return reject({iban: "Please enter valid IBAN number"});
      }
      if(acquirer == 'BBVA' && (acquirer_office.length > 4 || !/[0-9]+/.test(acquirer_office))) {
        return reject({acquirer_office: "Please enter your Bank's office number"});
      }

      const user_metadata = Object.assign({}, user.user_metadata, {
        store_url, store_goods, iban, acquirer, acquirer_office
      });

      if(user_metadata.country != "Spain")
        user_metadata.acquirer = USER_ACQUIRERS.Technoactivity;

      const success = await updateProfile(user.user_id, {user_metadata});
      if(success) openConfirmRegisterModal();
      updateStep(user);
    });
  };

  registerUser = () => {
    const {user, requestVerification, closeConfirmRegisterModal} = this.props;
    closeConfirmRegisterModal();
    setTimeout(async () => {
      const success = await requestVerification();
      this.context.router.replace('/');
    }, 500);
  };

  render() {
    return <div>
      <StoresView {...this.props} onSubmit={this.submitForm}/>
      <ConfirmRegisterView {...this.props} onRegister={this.registerUser}/>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  initialValues: {
    store_url: profileSelectors.getStoreUrl(state),
    store_goods: profileSelectors.getStoreGoods(state),
    iban: profileSelectors.getIban(state),
    acquirer: profileSelectors.getAcquirer(state),
    acquirer_office: profileSelectors.getAcquirerOffice(state),
  },
  country: profileSelectors.getCountry(state),
  isModifying: profileSelectors.getIsModifying(state),
  isConfirmRegisterOpen: selectors.getIsConfirmRegisterOpen(state),
});

export default reduxForm({
  form: 'onboarding-stores-form',
  fields: ['store_url', 'store_goods', 'iban', 'acquirer', 'acquirer_office'],
}, mapStateToProps, actions)(StoresForm);