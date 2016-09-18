import React, {PropTypes} from 'react';

const TransactionsView = ({transactions}) => (
  <div className="ui main container">
    <div className="ui segment padded-bottom">
      <h1 className="ui header">Transactions</h1>
      <div className="ui search">
        <div className="ui icon input">
          <input type="text" placeholder="Search name or email..."/>
          <i className="search icon"></i>
        </div>
      </div>
      <table className="ui large striped table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>Type</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>€42.97</td>
            <td>OK</td>
            <td>Debit Card</td>
            <td>Ranier Montalbo</td>
            <td>ranier@gmail.com</td>
            <td>23:45:00</td>
          </tr>
          <tr>
            <td>€42.97</td>
            <td>OK</td>
            <td>Debit Card</td>
            <td>Ranier Montalbo</td>
            <td>ranier@gmail.com</td>
            <td>23:45:00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="6">
              <button className="ui basic button center">Show more</button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

export default TransactionsView;
