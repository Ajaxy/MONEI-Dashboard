import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import {PaginatedTable} from 'components/Table';
import TransactionRow, {NUM_COLUMNS} from './TransactionRow';
import TransactionDetails from './TransactionDetails';
import DateTimeInput from 'components/DateTimeInput';
import Button from 'components/Button';
import classNames from './TransactionsView.scss';
import moment from 'moment';
import cx from 'classnames';

const TransactionsView = ({
  transactions,
  fromDate,
  toDate,
  goToNextPage,
  goToPrevPage,
  filterByDate,
  viewDetails,
  closeDetails,
  printPage,
  isFetching,
  isFirstPage,
  isLastPage,
  isDetailsModalOpen,
  transactionViewed,
  subAccountById
}) => {
  const today = moment();
  const lastWeek = moment().subtract(6, 'days');
  const lastMonth = moment().subtract(30, 'days');
  const fromDateTimestamp = moment(fromDate).startOf('day');
  const toDateTimestamp = moment(toDate).endOf('day');
  const selectedPeriod = toDateTimestamp - fromDateTimestamp;
  return (
    <section className="ui basic segment">
      <div className={classNames.filters}>
        <Button
          disabled={isFetching}
          className={cx('icon', classNames.arrowButton)}
          onClick={() => filterByDate(fromDateTimestamp - selectedPeriod, toDateTimestamp - selectedPeriod - 1)}>
          <i className="left chevron icon" />
        </Button>
        <DateTimeInput
          fieldClass={classNames.filter}
          placeholder="From date"
          name="date"
          label={false}
          timeFormat={false}
          isValidDate={date => date.isSameOrBefore(new Date())}
          defaultValue={fromDate}
          value={fromDate}
          onChange={(date) => filterByDate(date, toDate)}
        />
        <b>&mdash;</b>
        <DateTimeInput
          fieldClass={classNames.filter}
          placeholder="To date"
          name="date"
          label={false}
          timeFormat={false}
          isValidDate={date => date.isBetween(fromDate, new Date(), null, '[]')}
          defaultValue={toDate}
          value={toDate}
          onChange={(date) => filterByDate(fromDate, date)}
        />
        <Button
          disabled={isFetching || fromDateTimestamp + selectedPeriod + 1 > today}
          className={cx('icon', classNames.arrowButton)}
          onClick={() => filterByDate(fromDateTimestamp + selectedPeriod + 1, toDateTimestamp + selectedPeriod)}>
          <i className="right chevron icon" />
        </Button>
        <Button
          className={classNames.filter}
          disabled={isFetching}
          onClick={() => filterByDate(today, today)}>
          Today
        </Button>
        <Button
          className={classNames.filter}
          disabled={isFetching}
          onClick={() => filterByDate(lastWeek, today)}>
          Last week
        </Button>
        <Button
          className={classNames.filter}
          disabled={isFetching}
          onClick={() => filterByDate(lastMonth, today)}>
          Last month
        </Button>
        <div className={classNames.spacer} />
        <Link
          className="ui button green"
          to="transactions/new">
          New transaction
        </Link>
      </div>
      <PaginatedTable
        {...{isFetching, isFirstPage, isLastPage}}
        selectable={!isFetching && transactions.length > 0}
        numColumns={NUM_COLUMNS}
        onNextPage={goToNextPage}
        onPrevPage={goToPrevPage}
        className="large striped fixed single line selectable"
        resourceName="transactions"
        header={<TransactionRow isHeader />}>
        {transactions.map((tx, index) =>
          <TransactionRow
            key={index}
            transaction={tx}
            onClick={viewDetails}
          />)}
      </PaginatedTable>
      <TransactionDetails
        transaction={transactionViewed}
        subAccount={subAccountById[transactionViewed.channelId]}
        isOpen={isDetailsModalOpen}
        onPrint={printPage}
        onClose={closeDetails} />
    </section>
  );
};

TransactionsView.propTypes = {
  transactions: PropTypes.array.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  goToPrevPage: PropTypes.func.isRequired,
  filterByDate: PropTypes.func.isRequired,
  viewDetails: PropTypes.func.isRequired,
  closeDetails: PropTypes.func.isRequired,
  printPage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  isDetailsModalOpen: PropTypes.bool.isRequired,
  transactionViewed: PropTypes.object,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  isFirstPage: PropTypes.bool,
  subAccountById: PropTypes.object.isRequired
};

export default TransactionsView;
