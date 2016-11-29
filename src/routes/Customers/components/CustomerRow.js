import React, {PropTypes} from 'react';
import classNames from './CustomerRow.scss';

const CustomerRow = ({customer, isHeader = false}) => {
  if (isHeader) {
    return (
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    );
  } else {
    return (
      <tr className={classNames.row}>
        <td>{`${customer.givenName} ${customer.surname}`}</td>
        <td>{customer.email}</td>
      </tr>
    );
  }
};

CustomerRow.propTypes = {
  customer: PropTypes.shape({
    email: PropTypes.string,
    givenName: PropTypes.string,
    surname: PropTypes.string
  }),
  isHeader: PropTypes.bool
};

export default CustomerRow;
