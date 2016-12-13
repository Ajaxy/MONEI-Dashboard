import React, {PropTypes} from 'react';
import UserRow, {NUM_COLUMNS} from './UserRow';
import Search from 'components/Search';
import {PaginatedTable} from 'components/Table';
import classNames from './UsersView.scss';

const UsersView = ({
  users,
  pages,
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
      className={classNames.paddedBottom}
    />
    <PaginatedTable
      {...{isFetching, isFirstPage, isLastPage}}
      selectable={!isFetching && users.length > 0}
      numColumns={NUM_COLUMNS}
      onNextPage={() => getPage(pages.nextPage)}
      onPrevPage={() => getPage(pages.prevPage)}
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
  pages: PropTypes.object.isRequired,
  getPage: PropTypes.func.isRequired,
  viewUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  searchQueryString: PropTypes.string
};

export default UsersView;
