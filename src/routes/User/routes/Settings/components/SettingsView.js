import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Select, {SelectItem} from 'components/Select';
import {USER_ROLES, USER_STATUSES} from 'lib/enums';
import humanize from 'humanize-string';

const SettingsView = ({
  fields: {mid, mlogin, mpwd, role, status, iban, comment},
  handleSubmit,
  onSubmit,
  isUpdating
}) => (
  <div className="ui stackable grid">
    <div className="nine wide column">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Input {...mid} label="Sender" />
        <Input {...mlogin} label="User login" />
        <Input {...mpwd} label="User password" />
        <Select
          {...role}
          search>
          {Object.keys(USER_ROLES).map((key, i) => (
            <SelectItem
              key={i}
              value={`${USER_ROLES[key]}`}>
              {key}
            </SelectItem>
          ))}
        </Select>
        <Select
          {...status}
          search>
          {USER_STATUSES.map((status, i) => (
            <SelectItem
              key={i}
              value={status}>
              {status === 'validated' ? 'Validated by MONEI' : humanize(status)}
            </SelectItem>
          ))}
        </Select>
        <Input {...comment} />
        <Button
          type="submit"
          primary
          loading={isUpdating}>
          Update
        </Button>
      </form>
    </div>
  </div>
);

SettingsView.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

export default SettingsView;
