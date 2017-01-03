import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from 'modules/profile/actions';
import * as selectors from 'modules/profile/selectors';

class Home extends Component {
  static propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    if (this.props.isAdmin) {
      this.props.router.replace('/users');
    } else {
      this.props.router.replace('/dashboard');
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  isAdmin: selectors.getIsAdmin(state)
});

export default connect(mapStateToProps, actions)(withRouter(Home));
