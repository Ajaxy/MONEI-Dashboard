import React, {PropTypes} from 'react';
import Button from 'components/Button';
import cx from 'classnames';
import userPic from 'static/user.png';
import classNames from './UserHeader.scss';

const UserHeader = ({user, isVerificationRequested, verifyUserStart, loginAsUser, isImpersonating}) => {
  const emailLink = <a href={`mailto:${user.email}`} target="_top">{user.email}</a>;
  return (
    <h2 className={cx('ui header', classNames.header)}>
      <img
        className="tiny circular ui image"
        src={user.picture || userPic}
        onError={e => e.target.src = userPic} />
      <div className="content">
        {user.name || emailLink}
        {user.name && <div className="sub header">
          {emailLink}
        </div>}
      </div>
      <div className={classNames.spacer} />
      <div>
        {(isVerificationRequested && verifyUserStart) && <Button
          onClick={verifyUserStart}
          className="orange">
          Verify User
        </Button>}
        {' '}
        {loginAsUser && <Button
          primary
          loading={isImpersonating}
          onClick={() => loginAsUser(user.id)}>
          Login as User
        </Button>}
      </div>
    </h2>
  );
};

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  verifyUserStart: PropTypes.func,
  loginAsUser: PropTypes.func,
  isImpersonating: PropTypes.bool,
  isVerificationRequested: PropTypes.bool
};

export default UserHeader;
