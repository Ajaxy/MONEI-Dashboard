import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from 'routes/SubAccount/modules/actions';
import * as selectors from 'routes/SubAccount/modules/selectors';
import ZapierView from '../components/ZapierView';

class Zapier extends Component {
  static propTypes = {
    subAccount: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    createZapierToken: PropTypes.func.isRequired
  };

  componentWillMount() {
    const {subAccount, createZapierToken} = this.props;
    if (!subAccount.zapierToken) {
      createZapierToken(subAccount.id);
    }
  }

  render() {
    return <ZapierView {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  subAccount: selectors.getSubAccount(state),
  isFetching: selectors.getIsCreatingZapierToken(state)
});

export default connect(mapStateToProps, actions)(Zapier);
