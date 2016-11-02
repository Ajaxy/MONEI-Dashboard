import {connect} from 'react-redux';
import BankAccountsView from '../components/BankAccountsView';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, actions)(BankAccountsView);

