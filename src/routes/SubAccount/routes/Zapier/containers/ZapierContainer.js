import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from 'routes/SubAccount/modules/actions';
import * as selectors from 'routes/SubAccount/modules/selectors';
import ZapierView from '../components/ZapierView';

class Zapier extends Component {
  componentWillMount() {
    const {subAccount, zapierToken, createZapierToken} = this.props;
    if (!zapierToken) {
      createZapierToken(subAccount.channel);
    }
  }

  render() {
    return <ZapierView {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  subAccount: selectors.getSubAccount(state),
  zapierToken: selectors.getZapierToken(state),
  isFetching: selectors.getIsCreatingZapierToken(state)
});

export default connect(mapStateToProps, actions)(Zapier);
