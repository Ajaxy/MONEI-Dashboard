import Validator from 'validatorjs';
import IBAN from 'iban';
import aba from 'abavalidator';

const messages = Validator.getMessages('en');
messages.required = 'This field is required';
Validator.setMessages('en', messages);

Validator.register('phoneNumber', value => value.match(/^\+\d{10,14}$/), 'Incorrect format');
Validator.register('bankAccount',
  value => {
    if (/^[a-z]/i.test(value.toLowerCase())) {
      return IBAN.isValid(value)
    }
    if (/^[0-9]{13,26}$/.test(value)) {
      return aba.validate(value.substring(0, 9))
    }
    return false;
  },
  'Incorrect format'
);

export default Validator;
