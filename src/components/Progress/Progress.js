import React, {PropTypes} from 'react';
import cx from 'classnames';

const Progress = ({className, label, percent}) => {
  const style = {
    transitionDuration: '300ms',
    width: `${percent}%`
  };
  return (
    <div className={cx('ui progress', className)}>
      <div className="bar" style={style}>
        <div className="progress">{percent || 0}%</div>
      </div>
      {label && <div className="label">{label}</div>}
    </div>
  );
};

Progress.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  percent: PropTypes.number
};

export default Progress;
