import React, {PropTypes} from 'react';
import {PaginatedTable} from 'components/Table';
import Search from 'components/Search';
import CustomerRow, {NUM_COLUMNS} from './CustomerRow';
import classNames from './CustomersView.scss';

const CustomersView = ({
  customers,
  params,
  isFirstPage,
  isLastPage,
  handleSearchChange,
  searchQueryString,
  isFetching,
  getPage
}) => (
  <section className="ui basic segment padded-bottom">
    <div className="ui grid stackable">
      <div className="seven wide column">
        <Search
          placeholder="Customer email..."
          onSearch={handleSearchChange}
          defaultValue={searchQueryString}
          inputClass="fluid"
        />
      </div>
      <div className="nine wide column right aligned">
        </div>
      </div>
    <PaginatedTable
      {...{isFetching, isFirstPage, isLastPage}}
      selectable={!isFetching && customers.length > 0}
      numColumns={NUM_COLUMNS}
      onNextPage={() => getPage(params.nextPage)}
      onPrevPage={() => getPage(params.prevPage)}
      resourceName="customers"
      className="large striped fixed single line"
      header={<CustomerRow isHeader />}>
      {customers.map((customer, index) => (
        <CustomerRow key={index} customer={customer} />
      ))}
    </PaginatedTable>
  </section>
);

CustomersView.propTypes = {
  customers: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  getPage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  searchQueryString: PropTypes.string
};

export default CustomersView;
