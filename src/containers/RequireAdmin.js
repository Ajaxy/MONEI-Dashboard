import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as selectors from 'modules/profile/selectors';
import NotFound from 'routes/NotFound/components/NotFoundView';

export default function(ComposedComponent) {
  class RequireAdmin extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    static propTypes = {
      isAdmin: PropTypes.bool.isRequired
    };

    render() {
      if (!this.props.isAdmin) {
        return <NotFound />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    isAdmin: selectors.getIsAdmin(state)
  });

  return connect(mapStateToProps)(RequireAdmin);
}
