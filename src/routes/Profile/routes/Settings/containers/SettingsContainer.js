import {reduxForm} from 'redux-form';
import SettingsView from '../components/SettingsView';
import * as selectors from 'modules/profile/selectors';
import * as actions from 'modules/profile/actions';

const mapStateToProps = (state) => {
  const profile = selectors.getProfile(state);
  return {
    initialValues: profile.user_metadata || {}
  };
};

export default reduxForm({
  form: 'appSettings',
  fields: ['isHintsDisabled']
}, mapStateToProps, actions)(SettingsView);
