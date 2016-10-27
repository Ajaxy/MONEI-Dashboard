import React, {PropTypes} from 'react';
import cx from 'classnames';
import classNames from './ChannelRow.scss';

const ChannelRow = ({channel, onClick, isHeader, isFooter}) => {
  if (isHeader) {
    return (
      <tr>
        <th>Name</th>
        <th>Channel ID</th>
        <th>Status</th>
        <th>Currency</th>
      </tr>
    );
  } else if (isFooter) {
    return (
      <tr>
        <th colSpan="4"></th>
      </tr>
    );
  } else {
    return (
      <tr className={classNames.row} onClick={() => onClick(channel.channel)}>
        <td>{channel.name}</td>
        <td>{channel.channel}</td>
        <td>{channel.state}</td>
        <td>€</td>
      </tr>
    );
  }
};

export default ChannelRow;