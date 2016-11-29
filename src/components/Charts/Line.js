import React, {Component, PropTypes} from 'react';
import Chart from 'chart.js';

class LineChart extends Component {
  componentDidMount() {
    const {labels, datasets, options} = this.props;
    this.chart = new Chart(this.canvas, {
      type: 'line',
      data: {
        labels,
        datasets
      },
      options
    });
  }

  componentDidUpdate() {
    const {labels, datasets} = this.props;
    this.chart.data.labels = labels;
    this.chart.data.datasets = datasets;
    this.chart.update();
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <canvas ref={el => this.canvas = $(el)} />;
  }
}

LineChart.propTypes = {
  labels: PropTypes.array,
  datasets: PropTypes.array,
  options: PropTypes.object
};

export default LineChart;
