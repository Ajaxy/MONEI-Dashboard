import React, {PropTypes} from 'react';
import cx from 'classnames';
import classNames from './UserView.scss';
import {Link} from 'react-router';
import Loader from 'components/Loader';
import Button from 'components/Button';
import UserHeader from './UserHeader';
import PersonalDataView from './PersonalDataView';
import AdminDataForm from '../containers/AdminDataForm';

const UserView = ({
  user,
  userMetadata,
  verifyUser,
  loginAsUser,
  updateUser,
  syncUser,
  subAccounts,
  isSyncing,
  isFetching,
  isFetchingSubAccounts,
  isUpdating
}) => {
  return (
    <div>
      {isFetching
        ? <section className="ui vertical segment padded-bottom">
        <Loader active={isFetching} inline />
      </section>
        : <section className="ui vertical segment padded-bottom">
        <h1 className={cx('ui header', classNames.breadcrumb)}>
          <Link className={cx('ui section', classNames.link)} to="/users">Users</Link>
          <span className="divider"> / </span>
          <span className={cx('ui section', classNames.link)}>
          {userMetadata.name || user.email}
        </span>
        </h1>
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
          <h4 className="ui horizontal divider header">
            <i className="payment icon" />
            Sub accounts
          </h4>
          <table className="ui large striped table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sub Account ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isFetchingSubAccounts && <tr>
                <td colSpan="3">
                  <Loader active />
                </td>
              </tr>}
              {!isFetchingSubAccounts && subAccounts.length === 0 && <tr>
                <td colSpan="3">
                  <h4 className="ui header centered">
                    This user doesn't have sub accounts yet, or you need to sync data with PayOn.
                  </h4>
                </td>
              </tr>}
              {subAccounts.map(subAccount => <tr>
                <td>{subAccount.name}</td>
                <td>{subAccount.channelId}</td>
                <td>{subAccount.state}</td>
              </tr>)}
            </tbody>
          </table>
          <Button
            primary
            loading={isSyncing}
            onClick={() => syncUser(user.user_id, user.app_metadata.mid)}
            className={cx('right floated green')}>
            Sync user data with PayOn
            </Button>
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
