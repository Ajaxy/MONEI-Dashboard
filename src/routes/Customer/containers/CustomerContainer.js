import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import CustomerView from '../components/CustomerView';

class Customer extends Component {
  static propTypes = {
    fetchCustomer: PropTypes.func.isRequired,
    customerId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {customerId, fetchCustomer} = this.props;
    fetchCustomer(customerId);
  }

  render() {
    return <CustomerView{...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  customer: selectors.getCustomer(state),
  isFetching: selectors.getIsFetching(state),
  customerId: props.params.customerId
});

export default connect(mapStateToProps, actions)(Customer);
