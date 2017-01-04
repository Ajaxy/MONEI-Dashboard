import React, {Component, PropTypes} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Select, {SelectItem} from 'components/Select';
import base64url from 'base64-url';
import {widget} from 'monei-jsapi';
widget.disableAutoSetup();

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 9999;

class NewTransactionView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    isFetchingSubAccounts: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired,
    subAccounts: PropTypes.array.isRequired
  };

  setupWidget() {
    const {userId, values, currency} = this.props;
    if (values.subAccountId) {
      const token = base64url.encode(JSON.stringify({
        u: userId,
        c: values.subAccountId
      }));
      widget.setup(this.button, {
        amount: values.amount,
        noEnhance: true,
        name: 'New transaction',
        description: 'please enter customer data',
        token,
        currency,
        redirectUrl: location.href.replace('/new', '')
      });
    }
  }

  componentDidMount() {
    this.setupWidget();
  }

  componentDidUpdate() {
    this.setupWidget();
  }

  submit = (formProps) => {
    console.log(formProps);
  };

  render() {
    const {
      fields: {subAccountId, amount},
      isFetchingSubAccounts,
      subAccounts,
      handleSubmit,
      currency,
      invalid
    } = this.props;
    return (
      <section className="ui basic segment">
        <h2 className="ui header">Create new transaction</h2>
        <div className="ui stackable vertically padded grid">
          <form className="ui form nine wide column" onSubmit={handleSubmit(this.submit)}>
            <Input
              fieldClass="six wide"
              leftLabel={currency.toUpperCase()}
              leftLabelClass="basic"
              type="number"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              {...amount} />
            <Select
              label="Sub Account"
              loading={isFetchingSubAccounts}
              {...subAccountId}>
              {subAccounts.map((subAccount, i) => (
                <SelectItem
                  key={i}
                  value={subAccount.id}>
                  {subAccount.customName}
                </SelectItem>
              ))}
            </Select>
            <Button
              withRef={c => this.button = c}
              onClick={e => e.preventDefault()}
              primary
              disabled={invalid}>
              Create
            </Button>
          </form>
        </div>
      </section>
    );
  }
}

export default NewTransactionView;
