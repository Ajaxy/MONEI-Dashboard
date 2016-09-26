import React from 'react';
import cx from 'classnames';
import classNames from './UserRow.scss';
import humanize from 'humanize-string';

const UserRow = ({user, userMetadata, appMetadata, viewUser = () => {}, isHeader = false}) => {
  if (isHeader) {
    return (
      <tr>
        <th className="one wide"></th>
        <th>Name</th>
        <th>Store URL</th>
        <th>Acquirer</th>
        <th>Status</th>
        <th className="right aligned">Verified</th>
      </tr>
    );
  } else {
    return (
      <tr className={classNames.row} onClick={() => viewUser(user.user_id)}>
        <td>
          <img className="ui avatar image" src={user.picture}/>
        </td>
        <td>{userMetadata.name || user.email}</td>
        <td>
          {userMetadata.store_url ?
            <a href={userMetadata.store_url} onClick={e => e.stopPropagation()}>
              {userMetadata.store_url}
            </a>
            : <p>{userMetadata.store_url}</p>
          }
        </td>
        <td>{userMetadata.acquirer}</td>
        <td>{humanize(appMetadata.status || '')}</td>
        <td className="right aligned">
          {appMetadata.verified ?
            <i className={cx("big check circle icon", classNames.success)}/> :
              userMetadata.verification_requested ?
                <i className={cx("big warning circle icon", classNames.warning)}/> : ''}
        </td>
      </tr>
    );
  }
};

export const NUM_COLUMNS = 6;

export default UserRow;