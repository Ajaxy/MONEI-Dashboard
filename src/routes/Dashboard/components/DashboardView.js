import React, {PropTypes} from 'react';
import * as classNames from './DashboardView.scss';
import cx from 'classnames';
import {LineChart} from 'components/Charts';
import Loader from 'components/Loader';

const DATASET_OPTIONS = {
  fill: true,
  lineTension: 0.02,
  pointRadius: 3.5,
  borderColor: '#00796B',
  backgroundColor: 'rgba(153, 201, 195, 0.5)',
  pointBorderColor: '#FFFFFF',
  pointBackgroundColor: '#00796B'
};

const COMMON_OPTIONS = {
  legend: {
    display: false
  }
};

const AMOUNTS_OPTIONS = {
  ...COMMON_OPTIONS,
  tooltips: {
    callbacks: {
      title: (items, data) => {
        return `${items[0].xLabel}: €${items[0].yLabel}`;
      },
      label: (item, data) => {
        return '';
      }
    }
  }
};

const COUNT_OPTIONS = {
  ...COMMON_OPTIONS,
  tooltips: {
    callbacks: {
      title: (items, data) => {
        return `${items[0].xLabel}: ${items[0].yLabel}`;
      },
      label: (item, data) => {
        return '';
      }
    }
  }
};

const DashboardView = ({
  amountPerDay,
  countPerDay,
  totalAmount,
  totalCount,
  startDate,
  endDate,
  labels,
  isFetching
}) => (
  <div className="doubling stackable two column ui grid container">
    <div className="column">
      <div className="ui segment">
        <div className="ui statistic horizontal">
          <div className="value">€{totalAmount}</div>
          <div className="label">Total gross volume in 7 days</div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="ui segment">
        <div className="ui statistic horizontal">
          <div className="value">{totalCount}</div>
          <div className="label">Total successful charges in 7 days</div>
        </div>
      </div>
    </div>
    <div className="column">
      <div className={cx('ui segment', classNames.chart)}>
        <h3 className="ui header">Gross volume
          <div className="sub header">{`${startDate} - ${endDate}`}</div>
        </h3>
        {isFetching ?
          <Loader active inline={false} /> :
          <div>
            <LineChart
              labels={labels}
              datasets={[{
                data: amountPerDay,
                ...DATASET_OPTIONS
              }]}
              options={AMOUNTS_OPTIONS}
            />
          </div>
        }
      </div>
    </div>
    <div className="column">
      <div className={cx('ui segment', classNames.chart)}>
        <h3 className="ui header">Successful charges
          <div className="sub header">{`${startDate} - ${endDate}`}</div>
        </h3>
        {isFetching ?
          <Loader active inline={false} /> :
          <div>
            <LineChart
              labels={labels}
              datasets={[{
                data: countPerDay,
                ...DATASET_OPTIONS
              }]}
              options={COUNT_OPTIONS}
            />
          </div>
        }
      </div>
    </div>
  </div>
);

export default DashboardView;
