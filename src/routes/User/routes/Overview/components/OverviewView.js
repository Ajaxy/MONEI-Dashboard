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
  addRow('role', {format: true});
  addRow('verificationStatus', {format: true});
  addRow('profileType', {format: true});
  addRow('phoneNumber');
  addRow('country');
  addRow('idNumber', {name: 'ID Number'});
  addRow('documentName', {name: 'Document', url: documentUrl});
  addRow('storeUrl', {url: user.storeUrl});
  addRow('storeGoods');
  addRow('shopifyStoreName');
  addRow('shopifyStoreEmail', {name: 'Admin email for Shopify store'});
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
