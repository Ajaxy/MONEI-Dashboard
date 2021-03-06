import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

const DEFAULT_DELAY = 1000;

class Search extends Component {
  debouncedChange(value) {
    const {searchDelay} = this.props;
    return new Promise(resolve => {
      if (this.timerId) clearTimeout(this.timerId);
      this.timerId = setTimeout((function(innerValue) {
        return function() {
          resolve(innerValue);
        };
      })(value), searchDelay || DEFAULT_DELAY);
    });
  }

  handleKeydown = (e) => {
    if (e.key === 'Enter') {
      const {onSearch} = this.props;
      onSearch(e.target.value);
    }
  };

  handleChange = (e) => {
    const {onSearch} = this.props;
    this.debouncedChange(e.target.value).then((value) => {
      onSearch(value);
    });
  };

  render() {
    const {placeholder, defaultValue, className, inputClass} = this.props;
    return (
      <div className={cx('ui search', className)}>
        <div className={cx('ui icon input', inputClass)}>
          <input
            type="text"
            placeholder={placeholder || 'Search keyword...'}
            defaultValue={defaultValue}
            onKeyDown={this.handleKeydown}
            onChange={this.handleChange}
          />
          <i className="search icon" />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchDelay: PropTypes.number,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  inputClass: PropTypes.string
};

export default Search;
