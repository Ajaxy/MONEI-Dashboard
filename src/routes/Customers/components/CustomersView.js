import React, {PropTypes} from 'react';
import {PaginatedTable} from 'components/Table';
import Search from 'components/Search';
import CustomerRow, {NUM_COLUMNS} from './CustomerRow';

const CustomersView = ({
  customers,
  queryParams,
  isFirstPage,
  isLastPage,
  handleSearchChange,
  searchQueryString,
  isFetching,
  viewCustomer,
  getPage
}) => (
  <section className="ui basic segment">
    <div className="ui grid stackable">
      <div className="seven wide column">
        <Search
          placeholder="Customer email..."
          onSearch={handleSearchChange}
          defaultValue={searchQueryString}
          inputClass="fluid"
        />
      </div>
      <div className="nine wide column right aligned" />
    </div>
    <PaginatedTable
      {...{isFetching, isFirstPage, isLastPage}}
      selectable={!isFetching && customers.length > 0}
      numColumns={NUM_COLUMNS}
      onNextPage={() => getPage(queryParams.nextPage)}
      onPrevPage={() => getPage(queryParams.prevPage)}
      resourceName="customers"
      className="large striped fixed single line"
      header={<CustomerRow isHeader />}>
      {customers.map((customer, index) => (
        <CustomerRow
          key={index}
          customer={customer}
          viewCustomer={viewCustomer} />
      ))}
    </PaginatedTable>
  </section>
);

CustomersView.propTypes = {
  customers: PropTypes.array.isRequired,
  queryParams: PropTypes.object.isRequired,
  getPage: PropTypes.func.isRequired,
  viewCustomer: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  handleSearchChange: PropTypes.func.isRequired,
  searchQueryString: PropTypes.string
};

export default CustomersView;
