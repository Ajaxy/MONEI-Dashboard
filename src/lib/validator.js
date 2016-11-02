import Validator from 'validatorjs';
import IBAN from 'iban';

const messages = Validator.getMessages('en');
messages.required = 'This field is required.';
Validator.setMessages('en', messages);

Validator.register('phoneNumber', value => value.match(/^\+\d{10,14}$/), 'Incorrect format');
Validator.register('iban', value => IBAN.isValid(value), 'Incorrect format');

export default Validator;
