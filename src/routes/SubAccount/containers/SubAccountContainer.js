import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getIsInSandboxMode} from 'modules/profile/selectors';
import {fetchSubAccounts} from 'routes/SubAccounts/modules/actions';
import {getActiveSubAccount, getIsFetching, getIsUpToDate} from 'routes/SubAccounts/modules/selectors';
import SubAccountView from '../components/SubAccountView';

class Channel extends Component {
  componentWillMount() {
    if (!this.props.isUpToDate) {
      this.props.fetchSubAccounts();
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

export default connect(mapStateToProps, {fetchSubAccounts})(Channel);
