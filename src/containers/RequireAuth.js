import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as selectors from 'modules/auth/selectors';

export default function(ComposedComponent) {
  class RequireAuth extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      router: PropTypes.shape({
        push: PropTypes.func.isRequired
      }).isRequired
    };

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.router.replace('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.router.replace('/signin');
      }
    }

    render() {
      if (this.props.isAuthenticated) {
        return <ComposedComponent {...this.props} />;
      } else {
        return null;
      }
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: selectors.getIsAuthenticated(state)
  });

  return connect(mapStateToProps)(withRouter(RequireAuth));
}
