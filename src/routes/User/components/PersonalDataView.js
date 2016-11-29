import React, {PropTypes} from 'react';
import humanize from 'humanize-string';
import {Table} from 'components/Table';

const addRow = (list, store, key, title, capitalize = false) => {
  if (store[key]) {
    list.push(
      <tr key={list.length}>
        <td className="three wide">{title}</td>
        <td>{capitalize ? humanize(store[key]) : store[key]}</td>
      </tr>
    );
  }
};

const PersonalDataView = ({user, documentUrl}) => {
  const rows = [];
  addRow(rows, user.user_metadata, 'profile_type', 'Profile Type', true);
  addRow(rows, user.app_metadata, 'phone_number', 'Phone');
  addRow(rows, user.user_metadata, 'country', 'Country');
  addRow(rows, user.user_metadata, 'id_number', 'ID Number');
  addRow(rows, user.user_metadata, 'vat_number', 'VAT Number');
  rows.push(
    <tr key={rows.length}>
      <td className="two wide">Document</td>
      <td>
        <a href={documentUrl} target="_blank">
          {user.user_metadata.document_name}
        </a>
      </td>
    </tr>
  );
  rows.push(
    <tr key={rows.length}>
      <td className="two wide">Store URL</td>
      <td>
        <a href={user.user_metadata.store_url} target="_blank">
          {user.user_metadata.store_url}
        </a>
      </td>
    </tr>
  );
  addRow(rows, user.user_metadata, 'store_goods', 'Store Goods');
  addRow(rows, user.user_metadata, 'shopifyStoreName', 'Shopify store name');
  addRow(rows, user.user_metadata, 'shopifyStoreEmail', 'Admin email for Shopify store');
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
  user: PropTypes.shape({
    user_metadata: PropTypes.object.isRequired,
    app_metadata: PropTypes.object.isRequired
  }).isRequired,
  documentUrl: PropTypes.string
};

export default PersonalDataView;
