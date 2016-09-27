import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

class DatePicker extends Component {
  componentDidMount() {
    const {defaultValue, onChange} = this.props;
    this.element.calendar({
      type: 'date',
      onChange,
    });

    if(defaultValue instanceof Date) {
      this.element.calendar('set date', defaultValue);
    }
  }

  render() {
    const {className} = this.props;
    return (
      <div
        ref={el => { this.element = $(el); }}
        className={cx("ui calendar", className)}
      >
        <div className="ui input left icon">
          <i className="calendar icon"/>
          <input type="text" placeholder="Date/Time"/>
        </div>
      </div>
    );
  }
};

DatePicker.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};

export default DatePicker;
