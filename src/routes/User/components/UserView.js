import React, {PropTypes} from 'react';
import Loader from 'components/Loader';
import UserHeader from './UserHeader';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';
import ConfirmVerification from '../containers/ConfirmVerificationContainer';

const UserView = ({
  user,
  verifyUserStart,
  loginAsUser,
  isFetching,
  isImpersonating,
  isVerificationRequested,
  children
}) => {
  const baseUrl = `/users/${encodeURI(user.id)}`;
  return (
    <div>
      {isFetching
        ? <section className="ui vertical segment padded-bottom">
          <Loader active={isFetching} inline />
        </section>
        : <section className="ui vertical segment padded-bottom">
          <UserHeader {...{user, isVerificationRequested, verifyUserStart, loginAsUser, isImpersonating}} />
          <div className="ui secondary pointing large menu no-padding">
            <IndexLink to={baseUrl} className="item" activeClassName="active">
            Overview
          </IndexLink>
            <Link to={`${baseUrl}/settings`} className="item" activeClassName="active">
            Admin settings
          </Link>
            <Link to={`${baseUrl}/sub-accounts`} className="item" activeClassName="active">
            Sub accounts
          </Link>
          </div>
          {children}
        </section>}
      <ConfirmVerification />
    </div>
  );
};

UserView.propTypes = {
  user: PropTypes.object.isRequired,
  verifyUserStart: PropTypes.func.isRequired,
  loginAsUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isImpersonating: PropTypes.bool.isRequired,
  isVerifying: PropTypes.bool.isRequired,
  isVerificationRequested: PropTypes.bool.isRequired,
  children: PropTypes.any
};

export default UserView;
