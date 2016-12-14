import React, {PropTypes} from 'react';
import {Table} from 'components/Table';

export const OverviewView = ({user, documentUrl}) => {
  const rows = [];
  const addRow = (key, name, url) => {
    if (user[key]) {
      rows.push(
        <tr key={rows.length}>
          <td className="three wide">{name}</td>
          <td>{url ? <a href={url} target="_blank">{user[key]}</a> : user[key]}</td>
        </tr>
      );
    }
  };
  addRow('profileType', 'Profile Type');
  addRow('phoneNumber', 'Phone');
  addRow('country', 'Country');
  addRow('idNumber', 'ID Number');
  addRow('documentName', 'Document', documentUrl);
  addRow('storeUrl', 'Store URL', user.storeUrl);
  addRow('storeGoods', 'Store Goods');
  addRow('shopifyStoreName', 'Shopify store name');
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
