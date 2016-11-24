import React, {Component, PropTypes} from 'react';
import SettingsView from '../components/SettingsView';
import {reduxForm} from 'redux-form';
import * as actions from 'routes/User/modules/actions';
import * as selectors from 'routes/User/modules/selectors';

class Settings extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  submitForm = ({mid, mlogin, mpwd, role, status, acquirer, iban, comment}) => {
    const {user, updateUser} = this.props;
    const app_metadata = Object.assign({}, user.app_metadata, {mid, mlogin, mpwd, role, status, comment});
    const user_metadata = Object.assign({}, user.user_metadata, {acquirer, iban});
    updateUser(user.user_id, {app_metadata, user_metadata});
  };

  render() {
    return <SettingsView {...this.props} onSubmit={this.submitForm} />;
  }
}

const mapStateToProps = (state) => ({
  initialValues: selectors.getAppMetadata(state),
  user: selectors.getUser(state),
  isUpdating: selectors.getIsUpdating(state)
});

export default reduxForm({
  form: 'admin',
  fields: ['mid', 'mlogin', 'mpwd', 'role', 'status', 'acquirer', 'comment']
}, mapStateToProps, actions)(Settings);
