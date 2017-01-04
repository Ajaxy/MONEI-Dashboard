import React, {PropTypes, Component} from 'react';
import {widget} from 'monei-jsapi';
import base64url from 'base64-url';
import DotHint from 'components/DotHint';
import classNames from './WidgetView.scss';
import cx from 'classnames';
import Input from 'components/Input';

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 9999;

class WidgetView extends Component {
  componentDidMount() {
    widget.setupAll();
  }

  componentDidUpdate() {
    widget.setupAll();
  }

  buildButtonHtml() {
    const {currency, userId, subAccountId, values} = this.props;
    const token = base64url.encode(JSON.stringify({
      u: userId,
      c: subAccountId
    }));

    return `<div
      class="monei-widget"
      data-amount="${values.amount}"
      data-currency="${currency}"
      data-token="${token}"
      data-name="Demo widget"
      data-description="you can embed it anywhere"
      data-button-text="Pay with Card"
      data-redirect-url="${values.redirectUrl}"></div>`;
  }

  submit = (formProps) => {
    console.log(formProps);
  };

  render() {
    const {
      currency,
      fields: {amount, redirectUrl},
      handleSubmit,
      invalid
    } = this.props;
    const buttonHtml = this.buildButtonHtml();

    return (
      <section className="ui vertical segment">
        <p>Easily collect payments from your customers</p>
        <div className="ui stackable grid">
          <form className="ui form nine wide column" onSubmit={handleSubmit(this.submit)}>
            <h3>1. Choose the amount you want to charge:</h3>
            <Input
              label={false}
              fieldClass="six wide"
              leftLabel={currency.toUpperCase()}
              leftLabelClass="basic"
              type="number"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              {...amount} />
            <h3>2. Insert this code between <code>&lt;head&gt;&lt;/head&gt;</code> tags:</h3>
            <pre>&lt;script type=&quot;text/javascript&quot;src=&quot;{APP_CONFIG.widgetScriptURL}&quot;&gt;&lt;
              /script&gt;</pre>
            <h3>
              3. Setup the redirect URL:
              <DotHint>
                The results of all transactions will be passed to this URL
              </DotHint>
            </h3>
            <Input label={false} {...redirectUrl} />
            <h3>4. Insert this code in any place you want to put a widget:</h3>
            <pre>{buttonHtml}</pre>
          </form>
        </div>
        <h2>Demo</h2>
        <div
          className={cx({[classNames.disabled]: invalid})}
          dangerouslySetInnerHTML={{__html: buttonHtml}} />
      </section>
    );
  }
}

WidgetView.propTypes = {
  currency: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  subAccountId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
};
WidgetView.defaultProps = {};

export default WidgetView;
