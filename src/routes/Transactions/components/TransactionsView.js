import React, {PropTypes} from 'react';
import {InfiniteTable} from 'components/Table';
import TransactionRow, {NUM_COLUMNS} from './TransactionRow';
import DatePicker from 'components/DatePicker';
import classNames from './TransactionsView.scss';

const DEFAULT_VALUE = new Date();

const TransactionsView = ({transactions, totalAmount, loadMore, filterDate, isFetching, isLastPage}) => (
  <section className="ui basic segment padded-bottom">
    <h1 className="ui header">Transactions</h1>
    <DatePicker
      className={classNames.paddedBottom}
      defaultValue={DEFAULT_VALUE}
      onChange={filterDate}
    />
    <InfiniteTable
      {...{isFetching, isLastPage}}
      selectable={true}
      numColumns={NUM_COLUMNS}
      onLoadMore={loadMore}
      autoLoad={true}
      className="large single line"
      header={<TransactionRow isHeader={true}/>}
      footer={<TransactionRow totalAmount={totalAmount} isFooter={true}/>}
    >
      {
        (transactions.length > 0 || isFetching) ? transactions.map((tx, index) =>
          <TransactionRow
            key={index}
            transaction={tx}
          />)
        : <tr><td colSpan="2">No transactions</td></tr>
      }
    </InfiniteTable>
  </section>
);

TransactionsView.propTypes = {
  transactions: PropTypes.array.isRequired,
  totalAmount: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  filterDate: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
};

export default TransactionsView;
