import React, {PropTypes} from 'react';
import {Table} from 'components/Table';

const SubAccountOverview = ({channel, copyToClipboard}) => (
  <Table className="large definition" selectable>
    <tr onClick={() => copyToClipboard(channel.sender, 'App ID')}>
      <td className="two wide">App ID</td>
      <td>{channel.sender}</td>
    </tr>
    <tr onClick={() => copyToClipboard(channel.channel, 'Channel ID')}>
      <td className="two wide">Channel ID</td>
      <td>{channel.channel}</td>
    </tr>
    <tr onClick={() => copyToClipboard(channel.login, 'User ID')}>
      <td className="two wide">User ID</td>
      <td>{channel.login}</td>
    </tr>
    <tr onClick={() => copyToClipboard(channel.pwd, 'Password')}>
      <td className="two wide">Password</td>
      <td>{channel.pwd}</td>
    </tr>
    <tr>
      <td className="two wide">Status</td>
      <td>{channel.state}</td>
    </tr>
  </Table>
);

SubAccountOverview.propTypes = {
  channel: PropTypes.array.isRequired,
  copyToClipboard: PropTypes.func.isRequired
};

export default SubAccountOverview;
