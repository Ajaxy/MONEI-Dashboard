import React, {PropTypes} from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import {PROFILE_TYPES} from 'lib/constants';
import Select, {SelectItem} from 'components/Select';
import DocumentUpload from '../containers/DocumentContainer';
import cx from 'classnames';

const PersonalDataForm = ({
  fields: {
    name,
    profileType,
    country,
    companyName,
    idNumber,
    storeUrl,
    storeGoods
  },
  values,
  countries,
  handleSubmit,
  updateProfile,
  isUpdating,
  invalid,
  className,
  disabled
}) => {
  const isCompany = values.profileType === 'company';
  const submit = (formData) => {
    updateProfile(formData);
  };
  return (
    <div className={className}>
      <form className="ui form" onSubmit={handleSubmit(submit)}>
        <Input {...name} disabled={disabled} label="Name and surname" />
        <Select
          {...country}
          label="Country"
          disabled={disabled}
          search>
          {countries.map(country => (
            <SelectItem
              key={country.code}
              value={country.name}>
              <i className={cx(country.code.toLowerCase(), 'flag')} />
              {country.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          {...profileType}
          disabled={disabled}
          label="Profile Type">
          {PROFILE_TYPES.map((type, i) => (
            <SelectItem
              key={i}
              value={type.value}>
              {type.name}
            </SelectItem>
          ))}
        </Select>
        {isCompany && <Input
          {...companyName}
          disabled={disabled}
          label="Company name" />}
        <Input
          {...idNumber}
          disabled={disabled}
          label={isCompany ? 'VAT number or registration number of the company' : 'Identity document number'} />
        <div className="field">
          <label>
            {isCompany ? 'Document of company incorporation' : 'Your identity document' }
          </label>
          <DocumentUpload disabled={disabled} />
        </div>
        <br />
        <Input {...storeUrl} disabled={disabled} label="Your store website url" />
        <Input {...storeGoods} disabled={disabled} label="What goods are you selling?" />
        {!disabled && <Button
          primary
          type="submit"
          loading={isUpdating}
          disabled={invalid || isUpdating}>
          Save
        </Button>}
      </form>
    </div>
  );
};

PersonalDataForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  values: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

export default PersonalDataForm;
