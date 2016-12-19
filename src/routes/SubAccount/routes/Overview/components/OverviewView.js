import React, {PropTypes} from 'react';
import {Table} from 'components/Table';
import humanize from 'humanize-string';

const SubAccountOverview = ({subAccount, copyToClipboard, bankAccount, isFetchingBankAccounts, isInSandboxMode}) => (
  <Table className="large definition" selectable>
    <tr className="clickable" onClick={() => copyToClipboard(subAccount.sender, 'App ID')}>
      <td className="three wide">App ID</td>
      <td>{subAccount.sender}</td>
    </tr>
    <tr className="clickable" onClick={() => copyToClipboard(subAccount.id, 'Channel ID')}>
      <td className="three wide">Channel ID</td>
      <td>{subAccount.id}</td>
    </tr>
    <tr className="clickable" onClick={() => copyToClipboard(subAccount.login, 'User ID')}>
      <td className="three wide">User ID</td>
      <td>{subAccount.login}</td>
    </tr>
    <tr className="clickable" onClick={() => copyToClipboard(subAccount.pwd, 'Password')}>
      <td className="three wide">Password</td>
      <td>{subAccount.pwd}</td>
    </tr>
    <tr>
      <td className="three wide">Currency</td>
      <td>{subAccount.commercialConditions.currency}</td>
    </tr>
    <tr>
      <td className="three wide">Status</td>
      <td>{subAccount.state}</td>
    </tr>
    {!isInSandboxMode && <tr>
      <td className="three wide">Bank account</td>
      {isFetchingBankAccounts
        ? <td>Loading...</td>
        : bankAccount.id
        ? <td>{bankAccount.name} (...{bankAccount.last4Digits})</td>
        : <td className="error">No attached bank account yet</td>}
    </tr>}
    {!isInSandboxMode && <tr>
      <td className="three wide">Bank account status</td>
      <td>{humanize(subAccount.bankAccountStatus || '')}</td>
    </tr>}
  </Table>
);

SubAccountOverview.propTypes = {
  subAccount: PropTypes.object.isRequired,
  copyToClipboard: PropTypes.func.isRequired,
  bankAccount: PropTypes.object.isRequired,
  isFetchingBankAccounts: PropTypes.bool.isRequired,
  isInSandboxMode: PropTypes.bool.isRequired
};

export default SubAccountOverview;
