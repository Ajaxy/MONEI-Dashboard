import React, {PropTypes} from 'react';
import {PaginatedTable} from 'components/Table';
import TransactionRow, {NUM_COLUMNS} from './TransactionRow';
import TransactionDetails from 'routes/Transactions/components/TransactionDetails'

const TransactionsView = ({
  transactions,
  goToNextPage,
  goToPrevPage,
  isFetching,
  isFirstPage,
  isLastPage,
  viewDetails,
  closeDetails,
  isDetailsModalOpen,
  transactionViewed,
  printPage

}) => {
  return (
    <section>
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
            onClick={viewDetails}/>
        )}
      </PaginatedTable>
      <TransactionDetails
        isCustomerHidden
        transaction={transactionViewed}
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
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  isFirstPage: PropTypes.bool
};

export default TransactionsView;
