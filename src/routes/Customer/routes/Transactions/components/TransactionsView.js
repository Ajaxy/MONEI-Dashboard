import React, {PropTypes} from 'react';
import {PaginatedTable} from 'components/Table';
import TransactionRow, {NUM_COLUMNS} from './TransactionRow';

const TransactionsView = ({
  transactions,
  goToNextPage,
  goToPrevPage,
  isFetching,
  isFirstPage,
  isLastPage,
}) => {
  return (
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
          transaction={tx} />
      )}
    </PaginatedTable>
  );
};

TransactionsView.propTypes = {
  transactions: PropTypes.array.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  goToPrevPage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  isFirstPage: PropTypes.bool
};

export default TransactionsView;
