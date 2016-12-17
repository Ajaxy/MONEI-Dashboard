import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import WidgetView from '../components/WidgetView';

class Widget extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.fetchBankAccounts();
  }

  render() {
    return (
      <WidgetView {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  {}
)(Widget);
