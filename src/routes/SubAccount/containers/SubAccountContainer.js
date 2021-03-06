import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getIsInSandboxMode} from 'modules/profile/selectors';
import {fetchSubAccounts} from 'routes/SubAccounts/modules/actions';
import {getActiveSubAccount, getIsFetching, getIsUpToDate} from 'routes/SubAccounts/modules/selectors';
import SubAccountView from '../components/SubAccountView';

class SubAccount extends Component {
  static propTypes = {
    isUpToDate: PropTypes.bool.isRequired,
    fetchSubAccounts: PropTypes.func.isRequired,
    isSandboxMode: PropTypes.bool.isRequired,
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    if (!this.props.isUpToDate) {
      this.props.fetchSubAccounts();
    }
  }

  componentWillReceiveProps(np) {
    if (np.isSandboxMode !== this.props.isSandboxMode) {
      this.props.router.replace('/sub-accounts');
    }
  }

  render() {
    return <SubAccountView {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  subAccount: getActiveSubAccount(state),
  isFetching: getIsFetching(state),
  isSandboxMode: getIsInSandboxMode(state),
  isUpToDate: getIsUpToDate(state),
  subAccountId: props.params.subAccountId
});

export default connect(mapStateToProps, {fetchSubAccounts})(withRouter(SubAccount));
