import React, {Component, PropTypes} from 'react';
import classNames from './WidgetView.scss';
// import Button from 'components/Button';
// import Loader from 'components/Loader';
import cx from 'classnames';

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 999;

class WidgetView extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      amount: 5
    };
  }

  onChangeAmount(e) {
    this.setState({amount: e.target.value});
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
        &lt;script type=&quot;text/javascript&quot; src=&quot;https://jsapi.monei.net/widget.js&quot;&gt;&lt;/script&gt;
      </pre>
        <h3>2. Choose the amount you want to charge:</h3>
        <div className={classNames.amount}>
          <input type="range"
                 min={MIN_AMOUNT}
                 max={MAX_AMOUNT}
                 name="amount"
                 onChange={this.onChangeAmount.bind(this)}
          />
          <span>&euro; {this.state.amount}</span>
        </div>
        <h3>3. Insert this code in any place you want to display widget:</h3>
      <pre>
        &lt;div class=&quot;monei-widget&quot; data-amount=&quot;{this.state.amount}&quot;&gt;&lt;/div&gt;
      </pre>
      </section>
    );
  }
}

WidgetView.propTypes = {};
WidgetView.defaultProps = {};

export default WidgetView;
