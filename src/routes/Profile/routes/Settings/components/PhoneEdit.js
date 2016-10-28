import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Select, {SelectItem} from 'components/Select';
import {findByPhone} from 'lib/countries';
import cx from 'classnames';

const PhoneEdit = ({
  countries,
  fields: {phoneNumber, countryCode},
  handleSubmit,
  invalid,
  phoneVerificationStart,
  isVerifying,
  phoneEditCancel,
  isPhoneVerified,
  currentPhoneNumber
}) => {
  const onCountryCodeChange = (value) => {
    countryCode.onChange(value);
    if (countryCode.value !== value || !isPhoneVerified) {
      phoneNumber.onChange(value);
    }
  };
  const onPhoneNumberChange = (event) => {
    phoneNumber.onChange(event);
    const country = findByPhone(event.target.value);
    if (country) {
      countryCode.onChange(country.phoneCode);
    }
  };
  const cancel = (e) => {
    e.preventDefault();
    phoneEditCancel();
  };
  return (
    <form className="ui form" onSubmit={handleSubmit(phoneVerificationStart)}>
      <div className="two fields">
        <Select
          {...countryCode}
          search
          onChange={onCountryCodeChange}
          label="Select your country">
          {countries.map(country => (
            <SelectItem
              key={country.code}
              value={country.phoneCode}>
              <i className={cx(country.code.toLowerCase(), 'flag')} />
              {country.name}
            </SelectItem>
          ))}
        </Select>
        <Input
          {...phoneNumber}
          onChange={onPhoneNumberChange}
          mask="+99999999999999"
          maskChar=""
          type="text" />
      </div>
      <p className="grey text">
        We need your phone number only for security reasons.
        We will not use it nor reveal it to others.
      </p>
      {currentPhoneNumber && <Button onClick={cancel}>
        Cancel
      </Button>}
      {' '}
      <Button
        primary
        type="submit"
        loading={isVerifying}
        disabled={invalid || isVerifying}>
        Send SMS to verify
      </Button>
    </form>
  );
};

PhoneEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  phoneEditCancel: PropTypes.func.isRequired,
  phoneVerificationStart: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  invalid: PropTypes.bool.isRequired,
  isPhoneVerified: PropTypes.bool,
  isVerifying: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  currentPhoneNumber: PropTypes.string
};

export default PhoneEdit;
