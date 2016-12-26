import React, {Component} from 'react';
import classNames from './WidgetView.scss';

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 999;

class WidgetView extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      amount: 50,
      redirectUrl: 'yoursite.com/monei-callback'
    };
  }

  onChangeAmount(e) {
    this.setState({amount: e.target.value});
  }

  onChangeRedirectUrl(e) {
    this.setState({redirectUrl: e.target.value});
  }

  render() {
    return (
      <section className={classNames.container}>
        <h1 className="ui header">
          MONEI Widget
          <div className="sub header">Easily collect payments from your customers</div>
        </h1>
        <h3>1. Insert this code between <code>&lt;head&gt;</code> tags:</h3>
        <pre>
          &lt;script type=&quot;text/javascript&quot; src=&quot;https://jsapi.monei.net/widget.js&quot;&gt;&lt;
          /script&gt;
        </pre>
        <h3>2. Choose the amount you want to charge:</h3>
        <div className={classNames.amount}>
          <div className="ui right labeled input">
            <div className="ui label">&euro;</div>
            <input
              type="number"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              value={this.state.amount}
              onChange={this.onChangeAmount.bind(this)}
            />
            <div className="ui basic label">.00</div>
          </div>
          <input
            type="range"
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            name="amount"
            value={this.state.amount}
            onChange={this.onChangeAmount.bind(this)}
          />
        </div>
        <h3>3. Setup the callback URL:</h3>
        <div className="ui labeled fluid input">
          <div className="ui label">
            https://
          </div>
          <input
            type="text"
            value={this.state.redirectUrl}
            onKeyUp={this.onChangeRedirectUrl.bind(this)}
            // onKeyUp={this.onChangeRedirectUrl.bind(this)}
          />
        </div>
        <h3>4. Insert this code in any place you want to put widget:</h3>
        <pre>
          &lt;div class=&quot;monei-widget&quot;
          data-amount=&quot;{this.state.amount}&quot;
          data-redirect-url=&quot;https://{this.state.redirectUrl}&quot;&gt;&lt;/div&gt;
        </pre>
      </section>
    );
  }
}

WidgetView.propTypes = {};
WidgetView.defaultProps = {};

export default WidgetView;
