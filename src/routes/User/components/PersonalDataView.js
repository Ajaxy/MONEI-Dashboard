import React, {PropTypes} from 'react';
import humanize from 'humanize-string';
import {Table} from 'components/Table';

const PersonalDataView = ({user, documentUrl}) => {
  const rows = [];
  const addRow = (key, title, capitalize = false) => {
    if (user[key]) {
      rows.push(
        <tr key={rows.length}>
          <td className="three wide">{title}</td>
          <td>{capitalize ? humanize(user[key]) : user[key]}</td>
        </tr>
      );
    }
  };
  addRow('profileType', 'Profile Type', true);
  addRow('phoneNumber', 'Phone');
  addRow('country', 'Country');
  addRow('idNumber', 'ID Number');
  rows.push(
    <tr key={rows.length}>
      <td className="two wide">Document</td>
      <td>
        <a href={documentUrl} target="_blank">
          {user.documentName}
        </a>
      </td>
    </tr>
  );
  rows.push(
    <tr key={rows.length}>
      <td className="two wide">Store URL</td>
      <td>
        <a href={user.storeUrl} target="_blank">
          {user.storeUrl}
        </a>
      </td>
    </tr>
  );
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

PersonalDataView.propTypes = {
  user: PropTypes.object.isRequired,
  documentUrl: PropTypes.string
};

export default PersonalDataView;
