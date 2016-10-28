import Validator from 'validatorjs';

const messages = Validator.getMessages('en');
messages.required = 'This field is required.';
Validator.setMessages('en', messages);

Validator.register('phoneNumber', value => value.match(/^\+\d{10,14}$/), 'Incorrect format');

export default Validator;
