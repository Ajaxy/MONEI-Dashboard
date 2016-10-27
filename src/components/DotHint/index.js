import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import DotHint from './DotHint';
import * as selectors from 'modules/profile/selectors';

const Hint = ({isHintsDisabled, ...rest}) => {
  if (isHintsDisabled) return null;
  return <DotHint {...rest} />;
};

Hint.propTypes = {
  isHintsDisabled: PropTypes.bool
};

const mapStateToProps = (state) => {
  const profile = selectors.getProfile(state);
  const meta = profile.user_metadata || {};
  return {
    isHintsDisabled: meta.isHintsDisabled
  };
};

export default connect(mapStateToProps)(Hint);

