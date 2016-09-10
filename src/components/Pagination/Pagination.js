import React, {PropTypes} from 'react';
import cx from 'classnames';

const Pagination = ({onPageChange, next, prev}) => (
  <div className="ui right floated pagination menu">
    <a
      className={cx('icon item', {disabled: !prev})}
      onClick={() => onPageChange(prev, false)}>
      <i className="left chevron icon" />
    </a>
    <a
      className={cx('icon item', {disabled: !next})}
      onClick={() => onPageChange(next, true)}>
      <i className="right chevron icon" />
    </a>
  </div>
);

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  next: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  prev: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

export default Pagination;
