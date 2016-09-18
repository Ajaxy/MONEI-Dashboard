import React, {PropTypes} from 'react';
import * as classNames from './DashboardView.scss';

const DashboardView = () => (
  <div className="doubling stackable two column ui grid container">
    <div className="column">
      <div className="ui segment">
        <div className="ui statistic ">
          <div className="label">Total gross volume in 7 days</div>
          <div className="value">€4756</div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="ui segment">
        <div className="ui statistic ">
          <div className="label">Total successful charges in 7 days</div>
          <div className="value">168</div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="ui segment">
        <canvas id="chart-gross-volume"/>
      </div>
    </div>
    <div className="column">
      <div className="ui segment">
        <canvas id="chart-successful-charges"/>
      </div>
    </div>
  </div>
);

export default DashboardView;
