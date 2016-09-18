import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import DashboardView from '../components/DashboardView';
import Chart from 'chart.js/src/chart';

class Dashboard extends Component {
  static propTypes = {
    // fetchDashboard: PropTypes.func.isRequired
  };

  componentWillMount() {
    // this.props.fetchDashboard();
  }

  componentDidMount() {
    this.chart1 = new Chart($('#chart-gross-volume'), {
      type: 'line',
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          data: [{
            x: 0,
            y: 0
          }, {
            x: 10,
            y: 10
          }, {
            x: 20,
            y: 5
          }]
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    });

    this.chart2 = new Chart($('#chart-successful-charges'), {
      type: 'line',
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          data: [{
            x: 0,
            y: 0
          }, {
            x: 10,
            y: 10
          }, {
            x: 20,
            y: 5
          }]
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    })
  }

  getPage = (page) => {
    // this.props.fetchDashboard(page, true);
  };

  render() {
    return (
      <DashboardView
        getPage={this.getPage}
        {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  // customers: selectors.getDashboard(state),
  isFetching: selectors.getIsFetching(state),
  isDeleting: selectors.getIsDeleting(state),
  isUpToDate: selectors.getIsUpToDate(state),
  pages: selectors.getPages(state)
});

export default connect(mapStateToProps, actions)(Dashboard);
