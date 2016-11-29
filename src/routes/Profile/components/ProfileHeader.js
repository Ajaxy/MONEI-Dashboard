import React, {PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';

const ProfileHeader = ({isUser}) => (
  <div className="ui secondary pointing large menu no-padding">
    <IndexLink to="/profile" className="item" activeClassName="active">
      Overview
    </IndexLink>
    <Link to="/profile/settings" className="item" activeClassName="active">
      Settings
    </Link>
    {isUser && <Link to="/profile/bank-accounts" className="item" activeClassName="active">
      Bank accounts
    </Link>}
    <Link to="/profile/shopify-store" className="item" activeClassName="active">
      Free Shopify store
    </Link>
  </div>
);

ProfileHeader.propTypes = {
  isUser: PropTypes.bool
};

export default ProfileHeader;
