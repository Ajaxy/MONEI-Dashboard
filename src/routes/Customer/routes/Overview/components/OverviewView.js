import React, {PropTypes} from 'react';
import {Table} from 'components/Table';
import {formatUnixDate} from 'lib/utils';

const SubAccountOverview = ({customer}) => (
  <Table className="large definition">
    <tr>
      <td className="three wide">Name</td>
      <td>{customer.givenName}</td>
    </tr>
    <tr>
      <td className="three wide">Surname</td>
      <td>{customer.surname}</td>
    </tr>
    <tr>
      <td className="three wide">Email</td>
      <td>
        <a href={`mailto:${customer.email}`}>{customer.email}</a>
      </td>
    </tr>
    <tr>
      <td className="three wide">IP Address</td>
      <td>{customer.ip}</td>
    </tr>
    <tr>
      <td className="three wide">Created At</td>
      <td>{formatUnixDate(customer.createdAt)}</td>
    </tr>
  </Table>
);

SubAccountOverview.propTypes = {
  customer: PropTypes.object.isRequired
};

export default SubAccountOverview;
