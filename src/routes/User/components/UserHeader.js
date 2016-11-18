import React, {PropTypes} from 'react';
import Button from 'components/Button';
import cx from 'classnames';
import classNames from './UserHeader.scss';

const UserHeader = ({user, verifyUser, loginAsUser, isUpdating}) => (
  <h2 className="ui header">
    <img className="tiny circular ui image" src={user.picture} />
    <div className="content">
      <a href={`mailto:${user.email}`} target="_top">{user.email}</a>
      <div className="sub header">{user.email_verified ? ' (verified)' : ' (not verified)'}</div>
    </div>
    {(user.user_metadata.verification_requested && typeof verifyUser === 'function') ?
      <Button
        primary
        loading={isUpdating}
        onClick={() => verifyUser(user.user_id)}
        className={cx('right floated green', classNames.button)}>
        Verify User
      </Button>
      : null
    }
    {typeof loginAsUser === 'function' ?
      <Button
        primary
        loading={isUpdating}
        onClick={() => loginAsUser(user.user_id)}
        className={cx('right floated green', classNames.button)}>
        Login as User
      </Button>
      : null
    }
  </h2>
);

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  verifyUser: PropTypes.func,
  loginAsUser: PropTypes.func,
  isUpdating: PropTypes.bool
};

export default UserHeader;
