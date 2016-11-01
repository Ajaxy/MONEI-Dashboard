import React, {PropTypes} from 'react';
import {InfiniteTable} from 'components/Table';
import TransactionRow, {NUM_COLUMNS} from './TransactionRow';
import TransactionDetails from './TransactionDetails';
import DateTimeInput from 'components/DateTimeInput';
import classNames from './TransactionsView.scss';

const TransactionsView = ({
  transactions,
  fromDate,
  toDate,
  totalAmount,
  loadMore,
  filterByDate,
  viewDetails,
  closeDetails,
  printPage,
  isFetching,
  isLastPage,
  isDetailsModalOpen,
  transactionViewed,
}) => (
  <section className="ui basic segment padded-bottom">
    <h1 className="ui header">Transactions</h1>
    <div className={classNames.filters}>
      <DateTimeInput
        fieldClass={classNames.filter}
        placeholder="From date"
        name="date"
        label={false}
        timeFormat={false}
        isValidDate={date => date.isBefore(new Date())}
        defaultValue={fromDate}
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
        defaultValue={fromDate}
        onChange={(date) => filterByDate(fromDate, date)}
      />
    </div>
    <InfiniteTable
      {...{isFetching, isLastPage}}
      selectable={!isFetching && transactions.length > 0}
      numColumns={NUM_COLUMNS}
      onLoadMore={loadMore}
      autoLoad={true}
      className="large single line"
      header={<TransactionRow isHeader={true} />}
      footer={<TransactionRow totalAmount={totalAmount} isFooter={true} />}
    >
      {
        (transactions.length > 0 || isFetching) ? transactions.map((tx, index) =>
          <TransactionRow
            key={index}
            transaction={tx}
            onClick={viewDetails}
          />)
          : <tr>
          <td colSpan={NUM_COLUMNS} className="center aligned">No transactions</td>
        </tr>
      }
    </InfiniteTable>
    <TransactionDetails
      transaction={transactionViewed}
      isOpen={isDetailsModalOpen}
      onPrint={printPage}
      onClose={closeDetails} />
  </section>
);

TransactionsView.propTypes = {
  transactions: PropTypes.array.isRequired,
  totalAmount: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  filterByDate: PropTypes.func.isRequired,
  viewDetails: PropTypes.func.isRequired,
  closeDetails: PropTypes.func.isRequired,
  printPage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  isDetailsModalOpen: PropTypes.bool.isRequired,
  transactionViewed: PropTypes.object,
};

export default TransactionsView;
