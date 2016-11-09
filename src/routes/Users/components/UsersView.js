import React, {PropTypes} from 'react';
import UserRow, {NUM_COLUMNS} from './UserRow';
import Search from 'components/Search';
import {InfiniteTable} from 'components/Table';
import classNames from './UsersView.scss';

const UsersView = ({users, page, filterUsers, loadMore, viewUser, isFetching, isLastPage}) => (
  <section className="ui basic segment padded-bottom">
    <h1 className="ui header">Users</h1>
    <Search
      placeholder="Search name..."
      onSearch={filterUsers}
      defaultValue={page.filter}
      inputClass="fluid"
      className={classNames.paddedBottom}
    />
    <InfiniteTable
      {...{isFetching, isLastPage}}
      selectable={!isFetching && users.length > 0}
      numColumns={NUM_COLUMNS}
      onLoadMore={loadMore}
      total={page.total}
      count={page.lastItem}
      autoLoad
      className="large striped single line"
      header={<UserRow isHeader />}
    >
      {
        (users.length > 0 || isFetching) ? users.map((user, index) =>
          <UserRow
            key={index}
            user={user}
            userMetadata={user.user_metadata || {}}
            appMetadata={user.app_metadata || {}}
            viewUser={viewUser}
          />)
        : <tr><td colSpan={NUM_COLUMNS} className="center aligned">No users yet</td></tr>
      }
    </InfiniteTable>
  </section>
);

UsersView.propTypes = {
  users: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired,
  loadMore: PropTypes.func.isRequired,
  viewUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  filterUsers: PropTypes.func.isRequired
};

export default UsersView;
