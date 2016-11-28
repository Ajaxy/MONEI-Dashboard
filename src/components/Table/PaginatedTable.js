import React, {PropTypes} from 'react';
import Table from './Table';
import Loader from 'components/Loader';
import cx from 'classnames';
import classNames from './Table.scss';

const PaginatedTable = (props) => (
  <div className={classNames.tableWrapper}>
    <Loader active={props.isFetching} inline={false} dimmerClassName={classNames.dimmer} />
    <Table
      {...props}
      children={props.children.length ? props.children : (
        <tr>
          <td colSpan={props.numColumns} className={classNames.spacer} />
        </tr>
      )}
      footer={
        <tr>
          <th colSpan={props.numColumns}>
            <div className="ui right floated pagination menu">
              <a
                className={cx('icon item', {disabled: (props.isFirstPage || props.isFetching)})}
                onClick={props.onPrevPage}>
                <i className="left chevron icon" />
              </a>
              <a
                className={cx('icon item', {disabled: (props.isLastPage || props.isFetching)})}
                onClick={props.onNextPage}>
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
  numColumns: PropTypes.number,
  isFetching: PropTypes.bool,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
  children: PropTypes.any
};

export default PaginatedTable;
