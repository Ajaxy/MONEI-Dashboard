import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import './calendar';

class DatePicker extends Component {
  componentDidMount() {
    const {onChange} = this.props;
    this.element.calendar({
      type: 'date',
      onChange
    });
  }

  render() {
    const {className, placeholder, defaultValue} = this.props;
    return (
      <div
        ref={el => { this.element = $(el); }}
        className={cx('ui calendar', className)}
      >
        <div className="ui input left icon">
          <i className="calendar icon" />
          <input type="text" {...{placeholder, defaultValue}} />
        </div>
      </div>
    );
  }
};

DatePicker.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
};

export default DatePicker;
