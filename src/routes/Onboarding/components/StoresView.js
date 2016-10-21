import React, {PropTypes} from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import {USER_ACQUIRERS} from 'lib/enums';
import humanize from 'humanize-string';

const StoresView = ({
  fields: {store_url, store_goods, iban, acquirer, acquirer_office},
  handleSubmit,
  onSubmit,
  user, 
  country,
  goToPrevStep,
}) => (
  <section className="ui basic segment">
    <form className="ui form large" onSubmit={handleSubmit(onSubmit)}>
      <Input {...store_url} type="text" name="store_url" placeholder="" label="Your store website url"/>
      <Input {...store_goods} type="text" name="store_goods" placeholder="" label="What goods are you selling?"/>
      {country != "Spain" ? <Input {...iban} type="text" name="iban" placeholder="" label="IBAN number where you want your money to be settled."/> : null }
      {country == "Spain" ?
        <Select
          {...acquirer}
          label="Choose a bank you want to work with"
          name="acquirer"
          search>
          {Object.keys(USER_ACQUIRERS).map((key, index) => (
            <SelectItem key={index} value={USER_ACQUIRERS[key]}>{humanize(key)}</SelectItem>
          ))}
        </Select>
      : null }
      {acquirer.value == USER_ACQUIRERS.BBVA ?
        <Input {...acquirer_office} type="text" name="acquirer_office" placeholder="" label="What is (or it will be) your BBVA office number?"/>
      : null }
      {acquirer.value == USER_ACQUIRERS.BBVA ?
        <small><a target='_blank' href="https://www.bbva.es/cat/general/localizador-oficinas/index-buscador.jsp">If you don't know this number, please check it here.</a></small>
      : null }
      <div className="field"/>
    </form>
    <div className="ui right aligned relaxed grid">
      <div className="column">
        <Button 
          type="submit" 
          className="large green"
          onClick={goToPrevStep}>
          Previous Step
        </Button>
        <Button 
          type="submit"
          className="large yellow"
          disabled={
            !store_url.value || 
            !store_goods.value || 
            (country != "Spain" && !iban.value) || 
            (country == "Spain" && !acquirer.value) || 
            (acquirer.value == "BBVA" && !acquirer_office.value)
          }
          onClick={handleSubmit(onSubmit)}>
          Request Verification
        </Button>
      </div>
    </div>
  </section>
);

export default StoresView;