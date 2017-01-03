import React, {Component, PropTypes} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Select, {SelectItem} from 'components/Select';
import base64url from 'base64-url';
import {widget} from 'monei-jsapi';
widget.disableAutoSetup();

class NewTransactionView extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired
  };

  setupWidget() {
    const {userId, values} = this.props;
    if (values.subAccountId) {
      if (this.widgetIsInitialized) return;
      this.widgetIsInitialized = true;
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
        currency: 'eur',
        redirectUrl: location.href.replace('/new', '')
      })
    }
  }

  componentDidMount() {
    this.setupWidget()
  }

  componentDidUpdate() {
    this.setupWidget()
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
      invalid,
    } = this.props;
    return (
      <section className="ui basic segment">
        <h2 className="ui header">Create new transaction</h2>
        <div className="ui stackable vertically padded grid">
          <form className="ui form nine wide column" onSubmit={handleSubmit(this.submit)}>
            <Input type="number" {...amount} />
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
