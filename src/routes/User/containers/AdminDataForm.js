import React, {Component, PropTypes} from 'react';
import AdminDataForm from '../components/AdminDataForm';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';

class AdminDataContainer extends Component {
  submitForm = ({mid, mlogin, mpwd, role, status, acquirer, iban, comment}) => {
    const {user, updateUser} = this.props;
    const app_metadata = Object.assign({}, user.app_metadata, {mid, mlogin, mpwd, role, status, comment});
    const user_metadata = Object.assign({}, user.user_metadata, {acquirer, iban});
    updateUser(user.user_id, {app_metadata, user_metadata});
  };

  render() {
    return <AdminDataForm {...this.props} onSubmit={this.submitForm} />;
  }
}

AdminDataContainer.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  initialValues: selectors.getAppMetadata(state)
});

export default reduxForm({
  form: 'admin',
  fields: ['mid', 'mlogin', 'mpwd', 'role', 'status', 'acquirer', 'comment']
}, mapStateToProps, actions)(AdminDataContainer);
