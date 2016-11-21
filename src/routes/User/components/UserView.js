import React, {PropTypes} from 'react';
import Loader from 'components/Loader';
import UserHeader from './UserHeader';
import PersonalDataView from './PersonalDataView';
import AdminDataForm from '../containers/AdminDataForm';
import SubAccounts from '../containers/SubAccountsContainer';

const UserView = ({
  user,
  verifyUser,
  loginAsUser,
  updateUser,
  isFetching,
  isUpdating
}) => {
  return (
    <div>
      {isFetching
        ? <section className="ui vertical segment padded-bottom">
        <Loader active={isFetching} inline />
      </section>
        : <section className="ui vertical segment padded-bottom">
        <div>
          <UserHeader {...{user, verifyUser, loginAsUser, isUpdating}} />
          <h4 className="ui horizontal divider header">
            <i className="bar chart icon" />
            Personal Data
          </h4>
          <PersonalDataView user={user} />
          <h4 className="ui horizontal divider header">
            <i className="bar chart icon" />
            Admin Data
          </h4>
          <AdminDataForm {...{user, updateUser, isUpdating}} />
          {user.app_metadata.mid &&  <h4 className="ui horizontal divider header">
            <i className="payment icon" />
            Sub accounts
          </h4>}
          {user.app_metadata.mid && <SubAccounts />}
        </div>
      </section>}
    </div>
  );
};

UserView.propTypes = {
  user: PropTypes.object.isRequired,
  userMetadata: PropTypes.object.isRequired,
  verifyUser: PropTypes.func.isRequired,
  loginAsUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default UserView;
