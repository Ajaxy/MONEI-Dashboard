import NewTransaction from './containers/NewTransactionContainer';
import RequireAuth from 'containers/RequireAuth';

export default {
  path: 'transactions/new',
  component: RequireAuth(NewTransaction)
};
