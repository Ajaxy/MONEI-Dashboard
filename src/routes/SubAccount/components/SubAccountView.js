import React, {PropTypes} from 'react';
import SubAccountHeader from './SubAccountHeader';
import Loader from 'components/Loader';

const SubAccountView = ({subAccount, subAccountId, isSandboxMode, children}) => {
  if (!subAccount.name) {
    return (
      <section className="ui basic segment">
        <Loader active inline />
      </section>
    );
  }
  return (
    <section className="ui basic segment padded-bottom">
      <h1 className="ui header">
        {subAccount.name}
        {' '}
        {isSandboxMode && <span className="text orange">(only for testing purposes)</span>}
      </h1>
      <SubAccountHeader id={subAccountId} />
      {children}
    </section>
  );
};

export default SubAccountView;
