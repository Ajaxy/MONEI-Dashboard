import React, {PropTypes} from 'react';
import Table from './Table';

const PaginatedTable = (props) => (
  <Table
    {...props}
    footer={
      <tr>
        <th colSpan={props.numColumns}>
          <button className="ui basic button center">Show more</button>
        </th>
      </tr>
    }
  />
);

export default PaginatedTable;
