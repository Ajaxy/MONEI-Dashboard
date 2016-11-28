import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import SubAccountsView from '../components/SubAccountsView';

class SubAccounts extends Component {
  static propTypes = {
    fetchSubAccounts: PropTypes.func.isRequired,
    isInSandboxMode: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.fetchSubAccounts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isInSandboxMode !== this.props.isInSandboxMode) {
      this.props.fetchSubAccounts();
    }
  }

  render() {
    return (
      <SubAccountsView {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  subAccounts: selectors.getSubAccounts(state),
  isFetching: selectors.getIsFetching(state),
  isUpToDate: selectors.getIsUpToDate(state),
  isInSandboxMode: profileSelectors.getIsInSandboxMode(state)
});

export default connect(mapStateToProps, actions)(SubAccounts);
