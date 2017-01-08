import React, {PropTypes, Component} from 'react';
import moneiWidget from 'monei-widget';
import base64url from 'base64-url';
import DotHint from 'components/DotHint';
import Select, {SelectItem} from 'components/Select';
import CheckBoxInput from 'components/CheckBoxInput';
import classNames from './WidgetView.scss';
import cx from 'classnames';
import Input from 'components/Input';

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 9999;
const CARD_BRANDS = [
  {
    value: 'VISA',
    name: 'Visa'
  },
  {
    value: 'MASTER',
    name: 'MasterCard'
  },
  {
    value: 'MAESTRO',
    name: 'Maestro'
  },
  {
    value: 'JCB',
    name: 'JCB'
  }
];

class WidgetView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsVisible: false
    };
    this.token = base64url.encode(JSON.stringify({
      u: props.userId,
      c: props.subAccountId
    }));
  }

  componentDidMount() {
    moneiWidget.setupAll();
  }

  componentDidUpdate() {
    moneiWidget.setupAll();
  }

  toggleOptions = (e) => {
    e.preventDefault();
    this.setState({
      optionsVisible: !this.state.optionsVisible
    })
  };

  buildButtonHtml() {
    const {currency, values, fields: {brands}} = this.props;
    if (!values.amount) return;
    return `<div
      class="monei-widget"
      data-amount="${values.amount}"
      data-currency="${currency}"
      data-token="${this.token}"
      ${brands.pristine ? '' : `data-brands="${values.brands.join(' ')}"`}
      ${values.name ? `data-name="${values.name}"` : ''}
      ${values.description ? `data-description="${values.description}"` : ''}
      ${values.buttonText ? `data-button-text="${values.buttonText}"` : ''}
      ${values.showCardHolder ? `data-show-card-holder="${values.showCardHolder}"` : ''}
      data-redirect-url="${values.redirectUrl}"></div>`;
  }

  submit = (formProps) => {
    console.log(formProps);
  };

  render() {
    const {
      currency,
      fields: {amount, redirectUrl, name, description, brands, showCardHolder, buttonText},
      handleSubmit,
      invalid
    } = this.props;
    const {optionsVisible} = this.state;
    const buttonHtml = this.buildButtonHtml();

    return (
      <section className="ui vertical segment">
        <p>Easily collect payments from your customers</p>
        <div className="ui stackable grid">
          <form className="ui form nine wide column" onSubmit={handleSubmit(this.submit)}>
            <h3>Choose the amount you want to charge:</h3>
            <Input
              label={false}
              fieldClass="six wide"
              leftLabel={currency.toUpperCase()}
              leftLabelClass="basic"
              type="number"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              {...amount} />
            <h3>
              Setup the redirect URL
              <DotHint>
                Once the payment has been processed, the customer is redirected to this url.
              </DotHint>
            </h3>
            <Input label={false} {...redirectUrl} />
            <p>
              <a href="#" onClick={this.toggleOptions}>
                {optionsVisible ? 'Hide' : 'Show'} additional options
              </a>
            </p>
            <div className={cx({[classNames.hidden]: !optionsVisible})}>
              <Input {...name} hint="that will be visible in widget header"/>
              <Input {...description} hint="that will be visible in widget header"/>
              <Input {...buttonText} />
              <Select
                label="Accepted card brands"
                multiple
                {...brands}>
                {CARD_BRANDS.map((brand, i) => (
                  <SelectItem
                    key={i}
                    value={brand.value}>
                    {brand.name}
                  </SelectItem>
                ))}
              </Select>
              <CheckBoxInput label="Show cardholder field" {...showCardHolder} />
            </div>
            <h3>Insert this code between <code>&lt;head&gt;&lt;/head&gt;</code> tags:</h3>
            <pre>&lt;script src=&quot;{APP_CONFIG.widgetScriptURL}&quot;&gt;&lt;/script&gt;</pre>
            <h3>Insert this code in any place you want to put a widget:</h3>
            <pre>{buttonHtml}</pre>
            <h3>Get the payment status</h3>
            <p>to get the status of the payment, you should make a GET request to the
              <pre>{APP_CONFIG.apiBaseURL}checkouts/<b>{'{id}'}</b>?token=<b>{'{token}'}</b></pre>
            </p>
            <p><code>id</code> - payment id that you'll get as a query parameter appended to the <b>redirect URL</b></p>
            <p><code>token</code> - unique token generated for your widget</p>
            <pre>{this.token}</pre>
            <p>
              Read about response structure and avaliable parameters in {' '}
              <a href="https://docs.monei.net/reference/parameters#response-params" target="_blank">documentation</a>
            </p>
          </form>
        </div>
        <h2>Demo</h2>
        <div
          className={cx(classNames.widget, {[classNames.disabled]: invalid})}
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
