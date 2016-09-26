import React, {PropTypes} from 'react';
import humanize from 'humanize-string';
import {Table} from 'components/Table';

const addRow = (list, store, key, title, capitalize=false) => {
  if(store[key]) {
    list.push(
      <tr key={list.length}>
        <td className="two wide">{title}</td>
        <td>{capitalize ? humanize(store[key]) : store[key]}</td>
      </tr>
    );
  }
};

const PersonalDataView = ({user}) => {
  const rows = [];
  addRow(rows, user.user_metadata, "profile_type", "Profile Type", true);
  addRow(rows, user.app_metadata, "phone_number", "Phone");
  addRow(rows, user.user_metadata, "country", "Country");
  addRow(rows, user.user_metadata, "id_number", "ID Number");
  addRow(rows, user.user_metadata, "vat_number", "VAT Number");
  addRow(rows, user.user_metadata, "document_name", "Document");
  addRow(rows, user.user_metadata, "store_url", "Store URL");
  addRow(rows, user.user_metadata, "store_goods", "Store Goods");
  if(rows.length > 0) {
    return (
      <div className="ui basic segment">
        <Table className="large definition">
          {rows}
        </Table>
      </div>
    );
  }else{
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
    app_metadata: PropTypes.object.isRequired,
  }).isRequired
};

export default PersonalDataView;
