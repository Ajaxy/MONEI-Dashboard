import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from 'modules/profile/actions';
import * as selectors from 'modules/profile/selectors';
import HomeView from '../components/HomeView';

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  static propTypes = {
    isAdmin: PropTypes.bool.isRequired
  };

  componentDidMount() {
    if (this.props.isAdmin)
      { this.context.router.replace('/users'); }
    else
      { this.context.router.replace('/dashboard'); }
  }

  render() {
    return <HomeView />;
  }
}

const mapStateToProps = (state) => ({
  isAdmin: selectors.getIsAdmin(state)
});

export default connect(mapStateToProps, actions)(Home);
