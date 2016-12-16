import React, {PropTypes} from 'react';
import humanize from 'humanize-string';
import {Table} from 'components/Table';

export const OverviewView = ({user, documentUrl}) => {
  const rows = [];
  const addRow = (key, {name, url, format = false, defaultValue} = {}) => {
    const value = user[key] || defaultValue;
    if (value) {
      const formattedValue = format ? humanize(value) : value;
      rows.push(
        <tr key={rows.length}>
          <td className="three wide">{name || humanize(key)}</td>
          <td>{url ? <a href={url} target="_blank">{formattedValue}</a> : formattedValue }</td>
        </tr>
      );
    }
  };
  const idNumberLabel = user.country === 'United States'
    ? 'SSN'
    : user.profileType === 'company'
    ? 'Vat number'
    : 'ID number';

  addRow('role', {format: true});
  addRow('name');
  addRow('email', {url: `mailto:${user.email}`});
  addRow('dob', {name: 'Date of Birth'});
  addRow('phoneNumber');
  addRow('country');
  addRow('city');
  addRow('state');
  addRow('address');
  addRow('zipCode');
  addRow('profileType', {format: true});
  addRow('companyName');
  addRow('idNumber', {name: idNumberLabel});
  addRow('documentName', {name: 'Document', url: documentUrl});
  addRow('storeUrl', {url: user.storeUrl});
  addRow('storeGoods');
  addRow('shopifyStoreName');
  addRow('shopifyStoreEmail', {name: 'Admin email for Shopify store'});
  addRow('verificationStatus', {format: true});
  if (rows.length > 0) {
    return (
      <Table className="large definition">
        {rows}
      </Table>
    );
  } else {
    return (
      <div className="ui center aligned basic segment">
        No data available
      </div>
    );
  }
};

OverviewView.propTypes = {
  documentUrl: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default OverviewView;
