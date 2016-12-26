import React, {PropTypes} from 'react';
import cx from 'classnames';
import {USER_ROLES, VERIFICATION_STATUSES} from 'lib/enums';
import humanize from 'humanize-string';
import userPic from 'static/user.png';

export const NUM_COLUMNS = 6;

const UserRow = ({
  user,
  viewUser,
  isHeader
}) => {
  if (isHeader) {
    return (
      <tr>
        <th className="one wide" />
        <th>Name</th>
        <th>Store URL</th>
        <th className="two wide">Country</th>
        <th className="two wide">Status</th>
        <th className="two wide right aligned">Verified</th>
      </tr>
    );
  } else {
    const isAdmin = user.role === USER_ROLES.Admin;
    const isAcquirer = user.role === USER_ROLES.Acquirer;
    const isUser = user.role === USER_ROLES.User;
    const verificationStatusIcon = cx('big icon', {
      'circle check green': isUser && user.verificationStatus === VERIFICATION_STATUSES.Verified,
      'circle warning yellow': isUser && user.verificationStatus === VERIFICATION_STATUSES.Pending,
      'spy blue': isAdmin,
      'eye grey': isAcquirer
    });
    return (
      <tr
        onClick={() => viewUser(user.id)}>
        <td>
          <img
            className="ui avatar image"
            src={user.picture || userPic}
            onError={e => e.target.src = userPic} />
        </td>
        <td className="text overflow">{user.name || user.email}</td>
        <td className="text overflow">
          {user.storeUrl && <a
            href={user.storeUrl}
            target="_blank"
            onClick={e => e.stopPropagation()}>
            {user.storeUrl}
          </a>}
        </td>
        <td>{user.country}</td>
        <td>{humanize(user.status || '')}</td>
        <td className="right aligned">
          <i className={verificationStatusIcon} />
        </td>
      </tr>
    );
  }
};

UserRow.propTypes = {
  user: PropTypes.object,
  viewUser: PropTypes.func,
  isHeader: PropTypes.bool
};
export default UserRow;
