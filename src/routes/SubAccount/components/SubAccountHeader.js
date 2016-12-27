import React, {PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';

const SubAccountHeader = ({id}) => (
  <div className="ui secondary pointing large menu no-padding">
    <IndexLink className="item" activeClassName="active" to={`/sub-accounts/${id}`}>Overview</IndexLink>
    <Link className="item" activeClassName="active" to={`/sub-accounts/${id}/widget`}>Widget</Link>
    <Link className="item" activeClassName="active" to={`/sub-accounts/${id}/guides`}>Ecommerce Guides</Link>
    <Link className="item" activeClassName="active" to={`/sub-accounts/${id}/zapier`}>Zapier</Link>
    <Link className="item" activeClassName="active" to={`/sub-accounts/${id}/webhooks`}>Webhooks</Link>
    <Link className="item" activeClassName="active" to={`/sub-accounts/${id}/settings`}>Settings</Link>
  </div>
);

SubAccountHeader.propTypes = {
  id: PropTypes.string
};

export default SubAccountHeader;
