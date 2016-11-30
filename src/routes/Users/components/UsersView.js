import React, {PropTypes} from 'react';
import UserRow, {NUM_COLUMNS} from './UserRow';
import Search from 'components/Search';
import {PaginatedTable} from 'components/Table';
import classNames from './UsersView.scss';

const UsersView = ({
  users,
  page,
  filterUsers,
  viewUser,
  isFetching,
  isLastPage,
  isFirstPage,
  goToPage
}) => (
  <section className="ui basic segment padded-bottom">
    <Search
      placeholder="Search name..."
      onSearch={filterUsers}
      defaultValue={page.filter}
      inputClass="fluid"
      className={classNames.paddedBottom}
    />
    <PaginatedTable
      {...{isFetching, isLastPage, isFirstPage}}
      selectable={!isFetching && users.length > 0}
      numColumns={NUM_COLUMNS}
      onNextPage={() => goToPage(page.currentPage + 1)}
      onPrevPage={() => goToPage(page.currentPage - 1)}
      className="large striped single line"
      header={<UserRow isHeader />}>
      {(users.length > 0 || isFetching)
        ? users.map((user, index) =>
        <UserRow
          key={index}
          user={user}
          userMetadata={user.user_metadata || {}}
          appMetadata={user.app_metadata || {}}
          viewUser={viewUser}
        />)
        : <tr>
        <td colSpan={NUM_COLUMNS} className="center aligned">No users yet</td>
      </tr>}
    </PaginatedTable>
  </section>
);

UsersView.propTypes = {
  users: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired,
  goToPage: PropTypes.func.isRequired,
  viewUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  filterUsers: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool
};

export default UsersView;
