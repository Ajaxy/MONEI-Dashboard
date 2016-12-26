import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Select, {SelectItem} from 'components/Select';
import {USER_ROLES, USER_STATUSES} from 'lib/enums';
import humanize from 'humanize-string';

const SettingsView = ({
  fields: {mid, mlogin, mpwd, role, status, comment},
  handleSubmit,
  user,
  updateUser,
  isUpdating
}) => {
  const submit = (formData) => {
    updateUser(user.id, formData);
  };
  return (
    <div className="ui stackable grid">
      <div className="nine wide column">
        <form className="ui form" onSubmit={handleSubmit(submit)}>
          <Input {...mid} label="Sender" />
          <Input {...mlogin} label="User login" />
          <Input {...mpwd} label="User password" />
          <Select
            {...role}
            search>
            {Object.keys(USER_ROLES).map((key, i) => (
              <SelectItem
                key={i}
                value={USER_ROLES[key]}>
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
          <Input {...comment} component="textarea" rows="2" />
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
};

SettingsView.propTypes = {
  fields: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

export default SettingsView;
