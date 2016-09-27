import React, {PropTypes} from 'react';
import {InfiniteTable} from 'components/Table';
import Search from 'components/Search';
import CustomerRow from './CustomerRow';
import classNames from './CustomersView.scss';

const CustomersView = ({customers, loadMore, filterUsers, page, isFetching, isLastPage}) => (
  <section className="ui basic segment padded-bottom">
    <h1 className="ui header">Customers</h1>
    <Search
      placeholder="Search name or email"
      onSearch={filterUsers}
      defaultValue={page.filter}
      className={classNames.paddedBottom}
    />
    <InfiniteTable
      {...{isFetching, isLastPage}}
      selectable={false}
      numColumns={2}
      onLoadMore={loadMore}
      autoLoad={true}
      count={page.lastItem}
      className="large striped single line"
      header={<CustomerRow isHeader={true}/>}
    >
      {
        (customers.length > 0 || isFetching) ? customers.map((customer, index) =>
          <CustomerRow
            key={index}
            customer={customer}
          />)
        : <tr><td colSpan="2">No customers yet</td></tr>
      }
    </InfiniteTable>
  </section>
);

CustomersView.propTypes = {
  customers: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  filterUsers: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  page: PropTypes.object.isRequired,
};

export default CustomersView;
