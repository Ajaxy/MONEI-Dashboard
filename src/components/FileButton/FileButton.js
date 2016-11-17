import React, {Component, PropTypes} from 'react';
import Button from 'components/Button';

class FileButton extends Component {
  static propTypes = {
    accept: PropTypes.string,
    children: PropTypes.any,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const {accept, children, onChange} = this.props;
    return <Button {...this.props} onClick={() => this.file.click()}>
      <input
        ref={el => this.file = $(el)}
        type="file"
        accept={accept}
        style={{display: 'none'}}
        onChange={onChange}
      />
      {children}
    </Button>;
  }
}

export default FileButton;
