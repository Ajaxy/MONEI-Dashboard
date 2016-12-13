import SettingsView from '../components/SettingsView';
import {reduxForm} from 'redux-form';
import * as actions from 'routes/User/modules/actions';
import * as selectors from 'routes/User/modules/selectors';

const mapStateToProps = (state) => {
  const user = selectors.getUser(state);
  console.log(user);
  return {
    user,
    initialValues: user,
    isUpdating: selectors.getIsUpdating(state)
  }
};

export default reduxForm({
  form: 'userSettings',
  fields: ['mid', 'mlogin', 'mpwd', 'role', 'status', 'comment']
}, mapStateToProps, actions)(SettingsView);
