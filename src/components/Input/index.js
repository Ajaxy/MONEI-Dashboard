import Input from './Input';
import {omitProps} from 'lib/utils';

export default Input;

export const getInputProps = (props) => {
  return omitProps(props, 
    'initialValue',
    'autofill',
    'onUpdate',
    'valid',
    'dirty',
    'pristine',
    'active',
    'visited',
    'autofilled',
    'invalid',
    'touched',
    'error',
  );
};