import React, {PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';

const ProfileHeader = () => (
  <div className="ui secondary pointing large menu no-padding">
    <IndexLink to="/profile" className="item" activeClassName="active">
      Overview
    </IndexLink>
    <Link to="/profile/settings" className="item" activeClassName="active">
      Settings
    </Link>
    <Link to="/profile/bank-accounts" className="item" activeClassName="active">
      Bank accounts
    </Link>
  </div>
);

export default ProfileHeader;
