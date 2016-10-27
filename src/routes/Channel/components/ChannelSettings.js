import React, {PropTypes} from 'react';
import {Table} from 'components/Table';
import classNames from './ChannelSettings.scss';

const ChannelSettings = ({channel, copy}) => (
  <div className="ui basic segment padded-bottom">
    <Table className="large definition" selectable={true}>
      <tr className={classNames.row} onClick={() => copy(channel.sender, "App ID")}>
        <td className="two wide">App ID</td>
        <td>{channel.sender}</td>
      </tr>
      <tr className={classNames.row} onClick={() => copy(channel.channel, "Channel ID")}>
        <td className="two wide">Channel ID</td>
        <td>{channel.channel}</td>
      </tr>
      <tr className={classNames.row} onClick={() => copy(channel.login, "User ID")}>
        <td className="two wide">User ID</td>
        <td>{channel.login}</td>
      </tr>
      <tr className={classNames.row} onClick={() => copy(channel.pwd, "Password")}>
        <td className="two wide">Password</td>
        <td>{channel.pwd}</td>
      </tr>
      <tr>
        <td className="two wide">Status</td>
        <td>{channel.state}</td>
      </tr>
    </Table>
  </div>
);

export default ChannelSettings;