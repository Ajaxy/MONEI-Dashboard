import React, {PropTypes} from 'react';
import Button from 'components/Button';
import cx from 'classnames';
import userPic from 'static/user.png';
import classNames from './UserHeader.scss';

const UserHeader = ({user, isVerificationRequested, verifyUser, loginAsUser, isUpdating}) => {
  const emailLink = <a href={`mailto:${user.email}`} target="_top">{user.email}</a>;
  return (
    <h2 className="ui header">
      <img className="tiny circular ui image" src={user.picture} onError={e => e.target.src = userPic}/>
      <div className="content">
        {user.name || emailLink}
        {user.name && <div className="sub header">
          {emailLink}
        </div>}
      </div>
      {(isVerificationRequested && verifyUser) && <Button
        onClick={() => verifyUser(user.id)}
        className={cx('right floated orange', classNames.button)}>
        Verify User
      </Button>}
      {loginAsUser && <Button
        primary
        loading={isUpdating}
        onClick={() => loginAsUser(user.id)}
        className={cx('right floated', classNames.button)}>
        Login as User
      </Button>}
    </h2>
  );
}

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  verifyUser: PropTypes.func,
  loginAsUser: PropTypes.func,
  isUpdating: PropTypes.bool,
  isVerificationRequested: PropTypes.bool
};

export default UserHeader;
