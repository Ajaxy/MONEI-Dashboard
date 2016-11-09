import React, {PropTypes} from 'react';
import ProfileHeader from './ProfileHeader';
import cx from 'classnames';
import {NO_LOCALIZE} from 'lib/constants';

export const ProfileView = ({profile, children, isUser, isVerified}) => (
  <section className="ui basic segment">
    <h1 className={cx('ui header', NO_LOCALIZE)}>
      {profile.name}
    </h1>
    <ProfileHeader isUser={isUser} />
    {children}
  </section>
);

ProfileView.propTypes = {
  children: PropTypes.element.isRequired,
  isUser: PropTypes.bool.isRequired,
  isVerified: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default ProfileView;
