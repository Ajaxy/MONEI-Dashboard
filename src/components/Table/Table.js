import React, {PropTypes} from 'react';
import cx from 'classnames';

const Table = ({header, children, footer, className, numColumns = 0, selectable = false}) => (
  <table className={cx('ui table', className, {selectable})}>
    <thead>{header}</thead>
    <tbody>{children}</tbody>
    <tfoot>{footer}</tfoot>
  </table>
);

Table.propTypes = {
  header: PropTypes.object,
  children: PropTypes.node,
  footer: PropTypes.object,
  className: PropTypes.string,
  numColumns: PropTypes.number,
  selectable: PropTypes.bool
};

export default Table;
