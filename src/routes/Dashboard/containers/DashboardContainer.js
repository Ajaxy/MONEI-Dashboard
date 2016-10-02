import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import DashboardView from '../components/DashboardView';
import Chart from 'chart.js/src/chart';

class Dashboard extends Component {
  static propTypes = {
    fetchTransactionStats: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.refresh();
  }

  refresh = () => {
    this.props.fetchTransactionStats();
  };

  render() {
    return (
      <DashboardView
        refresh={this.refresh}
        {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: selectors.getIsFetching(state),
  amountPerDay: selectors.getAmountPerDay(state),
  countPerDay: selectors.getCountPerDay(state),
  totalAmount: selectors.getTotalAmount(state),
  totalCount: selectors.getTotalCount(state),
  startDate: selectors.getStartDate(state),
  endDate: selectors.getEndDate(state),
  labels: selectors.getLabels(state),
});

export default connect(mapStateToProps, actions)(Dashboard);
