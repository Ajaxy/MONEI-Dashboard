import React, {Component, PropTypes} from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import ChangePhoneForm from 'routes/Profile/containers/ChangePhoneForm';
import ConfirmPhoneForm from 'routes/Profile/containers/ConfirmPhoneForm';
import COUNTRIES from 'lib/countries';

const GeneralDataView = ({
  fields: {name, profile_type, country}, 
  handleSubmit,
  onSubmit,
  user,
  isModifying,
}) => (
  <section className="ui basic segment">
    <form className="ui form large">
      <Input {...name} type="text" name="name" placeholder="Name and surname" label="Name"/>
      <Select
        {...profile_type}
        label="Profile Type"
        name="profile_type"
        search>
        <SelectItem value="company">Company</SelectItem>
        <SelectItem value="individual">Individual</SelectItem>
      </Select>
      <Select
        {...country}
        label="Country"
        name="country"
        search>
        {COUNTRIES.map((country, index) => (
          <SelectItem key={index} value={country.name}>{country.name}</SelectItem>
        ))}
      </Select>
      <div className="field"/>
    </form>
    <ChangePhoneForm user={user} isLabeled={false}/>
    <ConfirmPhoneForm user={user}/>
    <div className="ui right aligned relaxed grid">
      <div className="column">
        <Button 
          type="submit" 
          className="large green" 
          loading={isModifying}
          disabled={!name.value || !profile_type.value || !country.value || !user.app_metadata.phone_number}
          onClick={handleSubmit(onSubmit)}>
          Next Step
        </Button>
      </div>
    </div>
  </section>
);      

export default GeneralDataView;