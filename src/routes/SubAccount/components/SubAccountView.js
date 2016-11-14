import React, {PropTypes} from 'react';
import SubAccountHeader from './SubAccountHeader';

const SubAccountView = ({subAccount, subAccountId, isSandboxMode, children}) => (
  <section className="ui basic segment padded-bottom">
    <h1 className="ui header">
      {subAccount.name}
      {' '}
      {isSandboxMode && <span className="text orange">(only for testing purposes)</span>}
    </h1>
    <SubAccountHeader id={subAccountId}/>
    {children}
  </section>
);

export default SubAccountView;
