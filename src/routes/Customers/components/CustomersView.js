import React, {PropTypes} from 'react';

const CustomersView = ({customers}) => (
  <div className="ui main container">
    <div className="ui segment padded-bottom">
      <h1 className="ui header">Customers</h1>
      <div className="ui search">
        <div className="ui icon input">
          <input type="text" placeholder="Search name or email..."/>
          <i className="search icon"></i>
        </div>
      </div>
      <table className="ui large striped table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
          <tr>
            <td>Ranier Montalbo</td>
            <td>ranier@gmail.com</td>
          </tr>
          <tr>
            <td>Jahlexzee Rodillas</td>
            <td>jahlexzee@gmail.com</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="2">
              <button className="ui basic button center">Show more</button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

CustomersView.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomersView;
