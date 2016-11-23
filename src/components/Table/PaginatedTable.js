import React, {PropTypes} from 'react';
import Table from './Table';
import Loader from 'components/Loader';

const PaginatedTable = (props) => (
  <Table
    {...props}
    children={
      props.isFetching ? [(
        <tr>
          <td colSpan={props.numColumns}>
            <Loader active inline />
          </td>
        </tr>
      )] : props.children
    }
    footer={
      (!props.isFirstPage || !props.isLastPage)   ? (
        <tr>
          <th colSpan={props.numColumns}>
          {!props.isFirstPage ? (
            <button
              className="ui icon button"
              disabled={props.isFetching}
              onClick={props.onPrevPage}
            >
              <i className="arrow left icon" />
            </button>
          ) : null}
          {!props.isLastPage ? (
            <button
              className="ui icon button"
              disabled={props.isFetching}
              onClick={props.onNextPage}
            >
              <i className="arrow right icon" />
            </button>
          ) : null}
          </th>
        </tr>
      ) : null
    }
  />
);

PaginatedTable.propTypes = {
  numColumns: PropTypes.number
};

export default PaginatedTable;
