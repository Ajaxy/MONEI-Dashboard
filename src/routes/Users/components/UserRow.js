import React, {PropTypes} from 'react';
import cx from 'classnames';
import classNames from './UserRow.scss';
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
    return (
      <tr className={classNames.row} onClick={() => viewUser(user.id)}>
        <td>
          <img className="ui avatar image" src={user.picture} onError={e => e.target.src = userPic} />
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
          {user.verified
            ? <i className={cx('big check circle icon', classNames.success)} />
            : user.verificationRequested
            ? <i className={cx('big warning circle icon', classNames.warning)} /> : ''}
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
