import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import OverviewView from '../components/OverviewView';
import * as selectors from 'modules/profile/selectors';
import {getFileUrl} from '../../PersonalData/modules/selectors';
import {fetchFileUrl} from '../../PersonalData/modules/actions';

class Overview extends Component {
  static propTypes = {
    documentName: PropTypes.string,
    fetchFileUrl: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {documentName, fetchFileUrl} = this.props;
    if (documentName) fetchFileUrl(documentName);
  }

  render() {
    return (
      <OverviewView {...this.props} />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  profile: selectors.getProfile(state),
  documentName: selectors.getDocumentName(state),
  documentUrl: getFileUrl(state)
});

export default connect(mapStateToProps, {fetchFileUrl})(Overview);
