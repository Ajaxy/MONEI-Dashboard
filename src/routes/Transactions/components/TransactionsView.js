import React, {PropTypes} from 'react';
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
  totalAmount,
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
    <section className="ui basic segment padded-bottom">
      <h1 className="ui header">Transactions</h1>
      <div className={classNames.filters}>
        <a
          className={cx('ui icon button', classNames.arrowButton)}
          onClick={() => filterByDate(fromDateTimestamp - selectedPeriod, toDateTimestamp - selectedPeriod - 1)}>
          <i className="left chevron icon" />
        </a>
        <DateTimeInput
          fieldClass={classNames.filter}
          placeholder="From date"
          name="date"
          label={false}
          timeFormat={false}
          isValidDate={date => date.isBefore(new Date())}
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
          isValidDate={date => date.isAfter(fromDate)}
          defaultValue={toDate}
          value={toDate}
          onChange={(date) => filterByDate(fromDate, date)}
        />
        <a
          className={cx('ui icon button', classNames.arrowButton, {disabled: fromDateTimestamp + selectedPeriod + 1 > today})}
          onClick={() => filterByDate(fromDateTimestamp + selectedPeriod + 1, toDateTimestamp + selectedPeriod)}>
          <i className="right chevron icon" />
        </a>
        <Button
          className={classNames.filter}
          onClick={() => filterByDate(today, today)}>
          Today
        </Button>
        <Button
          className={classNames.filter}
          onClick={() => filterByDate(lastWeek, today)}>
          Last week
        </Button>
        <Button
          className={classNames.filter}
          onClick={() => filterByDate(lastMonth, today)}>
          Last month
        </Button>
      </div>
      <PaginatedTable
        {...{isFetching, isFirstPage, isLastPage}}
        selectable={!isFetching && transactions.length > 0}
        numColumns={NUM_COLUMNS}
        onNextPage={goToNextPage}
        onPrevPage={goToPrevPage}
        className="large striped fixed single line selectable"
        resourceName="transactions"
        header={<TransactionRow isHeader />}
        footer={<TransactionRow totalAmount={totalAmount} isFooter />}>
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
  totalAmount: PropTypes.number.isRequired,
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
