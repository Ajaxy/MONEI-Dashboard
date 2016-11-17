import React, {PropTypes} from 'react';
import {Table} from 'components/Table';

const SubAccountOverview = ({subAccount, copyToClipboard}) => (
  <Table className="large definition" selectable>
    <tr onClick={() => copyToClipboard(subAccount.sender, 'App ID')}>
      <td className="two wide">App ID</td>
      <td>{subAccount.sender}</td>
    </tr>
    <tr onClick={() => copyToClipboard(subAccount.channel, 'Channel ID')}>
      <td className="two wide">Channel ID</td>
      <td>{subAccount.channel}</td>
    </tr>
    <tr onClick={() => copyToClipboard(subAccount.login, 'User ID')}>
      <td className="two wide">User ID</td>
      <td>{subAccount.login}</td>
    </tr>
    <tr onClick={() => copyToClipboard(subAccount.pwd, 'Password')}>
      <td className="two wide">Password</td>
      <td>{subAccount.pwd}</td>
    </tr>
    <tr>
      <td className="two wide">Status</td>
      <td>{subAccount.state}</td>
    </tr>
  </Table>
);

SubAccountOverview.propTypes = {
  subAccount: PropTypes.array.isRequired,
  copyToClipboard: PropTypes.func.isRequired
};

export default SubAccountOverview;
