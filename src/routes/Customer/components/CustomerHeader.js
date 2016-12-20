import React, {PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';

const CustomerHeader = ({customerId}) => (
  <div className="ui secondary pointing large menu no-padding">
    <IndexLink to={`/customers/${customerId}`} className="item" activeClassName="active">
      Overview
    </IndexLink>
    <Link to={`/customers/${customerId}/transactions`} className="item" activeClassName="active">
      Transactions
    </Link>
  </div>
);

CustomerHeader.propTypes = {
  customerId: PropTypes.string
};

export default CustomerHeader;
