import Validator from 'validatorjs';
import IBAN from 'iban';
import aba from 'abavalidator';

const messages = Validator.getMessages('en');
messages.required = 'This field is required';
Validator.setMessages('en', messages);

Validator.register('phoneNumber', value => value.match(/^\+\d{10,14}$/), 'Incorrect format');
Validator.register('iban', value => IBAN.isValid(value), 'Incorrect IBAN format');
Validator.register('routingNumber', value => aba.validate(value), 'Incorrect routing number');
Validator.register('accountNumber', value => /^[0-9]{4,17}$/.test(value), 'Incorrect routing number');

export default Validator;
