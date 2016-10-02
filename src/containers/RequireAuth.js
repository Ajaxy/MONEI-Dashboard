import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as selectors from 'modules/auth/selectors';

export default function(ComposedComponent) {
  class RequireAuth extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired
    };

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.replace('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.replace('/signin');
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

  return connect(mapStateToProps)(RequireAuth);
}
