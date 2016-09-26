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
    return <AdminDataForm {...this.props} onSubmit={this.submitForm}/>
  }
}

AdminDataContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  initialValues: {
    mid: selectors.getAppMetadata(state).mid,
    mlogin: selectors.getAppMetadata(state).mlogin,
    mpwd: selectors.getAppMetadata(state).mpwd,
    role: `${selectors.getAppMetadata(state).role || 0}`,
    status: selectors.getAppMetadata(state).status,
    acquirer: selectors.getUserMetadata(state).acquirer,
    iban: selectors.getUserMetadata(state).iban,
    comment: selectors.getAppMetadata(state).comment,
  }
});

export default reduxForm({
  form: 'admin',
  fields: ['mid', 'mlogin', 'mpwd', 'role', 'status', 'acquirer', 'iban', 'comment']
}, mapStateToProps, actions)(AdminDataContainer);
