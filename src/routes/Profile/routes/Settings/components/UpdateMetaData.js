import React, {PropTypes} from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import cx from 'classnames';

const UpdateMetaData = ({
  fields: {name, profile_type, country},
  countries,
  handleSubmit,
  updateUserMetaData,
  isUpdatingMetaData,
  invalid
}) => {
  return (
    <form className="ui form" onSubmit={handleSubmit(updateUserMetaData)}>
      <Input {...name} label="Name and surname"/>
      <Select
        {...profile_type}
        label="Profile Type">
        <SelectItem value="company">Company</SelectItem>
        <SelectItem value="individual">Individual</SelectItem>
      </Select>
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
      <Button
        primary
        type="submit"
        loading={isUpdatingMetaData}
        disabled={invalid || isUpdatingMetaData}>
        Save
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
