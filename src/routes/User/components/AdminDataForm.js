import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import {Table} from 'components/Table';
import {USER_ROLES, USER_STATUSES, USER_ACQUIRERS} from 'lib/enums';
import humanize from 'humanize-string';

const AdminDataForm = ({
  fields: {mid, mlogin, mpwd, role, status, acquirer, iban, comment},
  handleSubmit,
  onSubmit,
  isUpdating
}) => (
  <div className="ui basic segment">
    <form className="ui large form" target="#" onSubmit={handleSubmit(onSubmit)}>
      <Input {...mid} label="Sender" type="text" />
      <Input {...mlogin} label="User login" type="text" />
      <Input {...mpwd} label="User password" type="text" />
      <Select
        {...role}
        label="Role"
        name="role"
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
        label="Status"
        name="status"
        search>
        {USER_STATUSES.map((status, i) => (
          <SelectItem
            key={i}
            value={status}>
            {humanize(status)}
          </SelectItem>
        ))}
      </Select>
      <Select
        {...acquirer}
        label="Acquirer"
        name="acquirer"
        search>
        {Object.keys(USER_ACQUIRERS).map((key, i) => (
          <SelectItem
            key={i}
            value={USER_ACQUIRERS[key]}>
            {key}
          </SelectItem>
        ))}
      </Select>
      <Input {...iban} label="IBAN number" type="text" />
      <Input {...comment} label="Comment" type="text" />
      <Input
        name="update" type="submit" value="Update" label={false} disabled={isUpdating}
        className="ui button right floated green"
      />
    </form>
  </div>
);

AdminDataForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

export default AdminDataForm;
