import React, {PropTypes} from 'react';
import UserRow, {NUM_COLUMNS} from './UserRow';
import Search from 'components/Search';
import {PaginatedTable} from 'components/Table';

const UsersView = ({
  users,
  queryParams,
  isFirstPage,
  isLastPage,
  handleSearchChange,
  searchQueryString,
  viewUser,
  isFetching,
  getPage
}) => (
  <section className="ui basic segment padded-bottom">
    <Search
      placeholder="User email..."
      onSearch={handleSearchChange}
      defaultValue={searchQueryString}
      inputClass="fluid"
    />
    <PaginatedTable
      {...{isFetching, isFirstPage, isLastPage}}
      selectable={!isFetching && users.length > 0}
      numColumns={NUM_COLUMNS}
      onNextPage={() => getPage(queryParams.nextPage)}
      onPrevPage={() => getPage(queryParams.prevPage)}
      resourceName="users"
      className="large striped fixed single line"
      header={<UserRow isHeader />}>
      {users.map((user, index) => (
        <UserRow
          key={index}
          user={user}
          viewUser={viewUser} />
      ))}
    </PaginatedTable>
  </section>
);

UsersView.propTypes = {
  users: PropTypes.array.isRequired,
  queryParams: PropTypes.object.isRequired,
  getPage: PropTypes.func.isRequired,
  viewUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  searchQueryString: PropTypes.string,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool
};

export default UsersView;
