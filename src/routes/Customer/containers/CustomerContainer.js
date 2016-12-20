import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import {getIsInSandboxMode} from 'modules/profile/selectors';
import CustomerView from '../components/CustomerView';

class Customer extends Component {
  static propTypes = {
    fetchCustomer: PropTypes.func.isRequired,
    customerId: PropTypes.string.isRequired,
    isSandboxMode: PropTypes.bool.isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    const {customerId, fetchCustomer} = this.props;
    fetchCustomer(customerId);
  }

  componentWillReceiveProps(np) {
    if (np.isSandboxMode !== this.props.isSandboxMode) {
      this.props.router.replace('/customers');
    }
  }

  render() {
    return <CustomerView{...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  customer: selectors.getCustomer(state),
  isFetching: selectors.getIsFetching(state),
  isSandboxMode: getIsInSandboxMode(state),
  customerId: props.params.customerId
});

export default connect(mapStateToProps, actions)(withRouter(Customer));
