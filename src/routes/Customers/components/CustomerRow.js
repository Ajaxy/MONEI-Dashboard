import React, {PropTypes} from 'react';
import {formatUnixDate} from 'lib/utils';

export const NUM_COLUMNS = 3;

const CustomerRow = ({customer, viewCustomer, isHeader = false}) => {
  if (isHeader) {
    return (
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th className="three wide">Created at</th>
      </tr>
    );
  } else {
    return (
      <tr onClick={() => viewCustomer(customer.id)}>
        <td>{`${customer.givenName || ''} ${customer.surname || ''}`}</td>
        <td>
          <a
            href={`mailto:${customer.email}`}
            onClick={e => e.stopPropagation()}>
            {customer.email}
          </a>
        </td>
        <td>
          {formatUnixDate(customer.createdAt)}
        </td>
      </tr>
    );
  }
};

CustomerRow.propTypes = {
  customer: PropTypes.shape({
    email: PropTypes.string,
    givenName: PropTypes.string,
    surname: PropTypes.string,
    createdAt: PropTypes.number
  }),
  isHeader: PropTypes.bool,
  viewCustomer: PropTypes.func
};

export default CustomerRow;
