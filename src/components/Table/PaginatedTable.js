import React, {PropTypes} from 'react';
import Table from './Table';
import Loader from 'components/Loader';
import cx from 'classnames';
import classNames from './Table.scss';

const PaginatedTable = ({
  numColumns,
  children,
  isFetching,
  isFirstPage,
  isLastPage,
  onNextPage,
  onPrevPage,
  resourceName = 'resources',
  ...rest
}) => (
  <div className={classNames.tableWrapper}>
    <Loader active={isFetching} inline={false} dimmerClassName={classNames.dimmer} />
    <Table
      {...rest}
      children={children.length > 0
        ? children
        : <tr>
          <td colSpan={numColumns} className={classNames.spacer}>
            {!isFetching && <h3>No {resourceName} were found.</h3>}
          </td>
        </tr>}
      footer={
        <tr>
          <th colSpan={numColumns}>
            <div className="ui right floated pagination menu">
              <a
                className={cx('icon item', {disabled: (isFirstPage || isFetching)})}
                onClick={onPrevPage}>
                <i className="left chevron icon" />
              </a>
              <a
                className={cx('icon item', {disabled: (isLastPage || isFetching)})}
                onClick={onNextPage}>
                <i className="right chevron icon" />
              </a>
            </div>
          </th>
        </tr>
      }
    />
  </div>
);

PaginatedTable.propTypes = {
  numColumns: PropTypes.number.isRequired,
  isFetching: PropTypes.bool,
  isFirstPage: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  children: PropTypes.array,
  resourceName: PropTypes.string
};

export default PaginatedTable;
