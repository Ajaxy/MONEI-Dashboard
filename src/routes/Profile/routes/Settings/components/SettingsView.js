import React, {PropTypes} from 'react';
import CheckBox from 'components/CheckBox';
import DotHint from 'components/DotHint';

const SettingsView = ({
  fields: {
    isHintsDisabled
  },
  handleSubmit,
  updateProfileMetaData
}) => {
  const disableHints = (e) => {
    updateProfileMetaData({isHintsDisabled: e.target.value !== 'true'});
    isHintsDisabled.onChange(e);
  };
  return (
    <section className="ui vertical segment">
      <div className="ui stackable grid">
        <div className="nine wide column">
          <form className="ui form" onSubmit={handleSubmit(updateProfileMetaData)}>
            <div className="field">
              <CheckBox
                {...isHintsDisabled}
                className="green"
                onChange={disableHints}
                toggle
                label="Disable application hints"
              />
              <DotHint>
                This is an example of the hint
              </DotHint>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

SettingsView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateProfileMetaData: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};

export default SettingsView;
