import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import OverviewView from '../components/OverviewView';
import * as selectors from 'routes/User/modules/selectors';
import * as actions from 'routes/User/modules/actions';

class Overview extends Component {
  static propTypes = {
    documentName: PropTypes.string,
    fetchFileUrl: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {user, fetchFileUrl} = this.props;
    const documentName = user.user_metadata.document_name;
    if (documentName) fetchFileUrl(documentName);
  }

  render() {
    return (
      <OverviewView {...this.props} />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: selectors.getUser(state),
  documentUrl: selectors.getFileUrl(state)
});

export default connect(mapStateToProps, actions)(Overview);
