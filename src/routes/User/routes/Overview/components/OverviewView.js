import React, {PropTypes} from 'react';
import humanize from 'humanize-string';
import {Table} from 'components/Table';

export const OverviewView = ({user, documentUrl}) => {
  const rows = [];
  const addRow = (key, name, url) => {
    if (user[key]) {
      rows.push(
        <tr key={rows.length}>
          <td className="three wide">{name || humanize(key)}</td>
          <td>{url ? <a href={url} target="_blank">{user[key]}</a> : user[key]}</td>
        </tr>
      );
    }
  };
  addRow('role');
  addRow('verificationStatus');
  addRow('profileType');
  addRow('phoneNumber');
  addRow('country');
  addRow('idNumber', 'ID Number');
  addRow('documentName', 'Document', documentUrl);
  addRow('storeUrl', 'Store URL', user.storeUrl);
  addRow('storeGoods');
  addRow('shopifyStoreName');
  addRow('shopifyStoreEmail', 'Admin email for Shopify store');
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
