import React, {PropTypes} from 'react';

const ZAPIER_INSTRUCTIONS_URL = 'https://s3.amazonaws.com/microapps-open-assets/MONEI-Zapier-Instruction.pdf';
const ChannelZapier = ({zapierToken, isFetching, copyToClipboard}) => (
  <section className="ui vertical segment">
    <p>
      <a href="https://zapier.com/" target="_blank">Zapier</a> {' '}
      moves info between your web apps automatically, so you can focus on your most important work.
    </p>
    <div className="ui stackable grid">
      <div className="ui form nine wide column">
        <div className="field">
          <label>API Token</label>
          <textarea
            onClick={() => copyToClipboard(zapierToken, 'Zapier API Token')}
            rows="4" readOnly>
            {zapierToken}
          </textarea>
        </div>
      </div>
    </div>
    <br />
    <p>
      <a target="_blank" href={ZAPIER_INSTRUCTIONS_URL}>Show me instructions</a>
    </p>
  </section>
);

export default ChannelZapier;
