import React, {PropTypes} from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import {PROFILE_TYPES} from 'lib/constants'
import Select, {SelectItem} from 'components/Select';
import DocumentUpload from '../containers/DocumentContainer';
import cx from 'classnames';

const UpdateMetaData = ({
  fields: {
    name,
    profile_type,
    country,
    company_name,
    id_number,
    vat_number,
    store_url,
    store_goods,
    iban
  },
  values,
  countries,
  handleSubmit,
  updateUserMetaData,
  isUpdatingMetaData,
  invalid
}) => {
  const isCompany = values.profile_type === 'company';
  return (
    <form className="ui form" onSubmit={handleSubmit(updateUserMetaData)}>
      <Input {...name} label="Name and surname"/>
      <Select
        {...country}
        label="Country"
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
        {...profile_type}
        label="Profile Type">
        {PROFILE_TYPES.map((type, i) => (
          <SelectItem
            key={i}
            value={type.value}>
            {type.name}
          </SelectItem>
        ))}
      </Select>
      {isCompany && <Input {...company_name} label="Company name"/>}
      {isCompany && <Input {...vat_number} label="VAT number or registration number of the company"/>}
      {!isCompany && <Input {...id_number} label="Identity document number"/>}
      <div className="field">
        <label>
          {isCompany ? 'Upload document of company incorporation' : 'Upload your identity document' }
        </label>
        <DocumentUpload />
      </div>
      <br />
      <Input {...iban} label="IBAN number where you want your money to be settled."/>
      <Input {...store_url} label="Your store website url"/>
      <Input {...store_goods} label="What goods are you selling?"/>
      <Button
        primary
        type="submit"
        loading={isUpdatingMetaData}
        disabled={invalid || isUpdatingMetaData}>
        Save settings
      </Button>
    </form>
  );
};

UpdateMetaData.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateUserMetaData: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  isUpdatingMetaData: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired
};

export default UpdateMetaData;
