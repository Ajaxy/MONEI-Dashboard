import React, {PropTypes} from 'react';
import CustomerHeader from './CustomerHeader';
import Loader from 'components/Loader';
import cx from 'classnames';
import {NO_LOCALIZE} from 'lib/constants';

export const CustomerView = ({customer, children, isFetching}) => {
  if (!customer.id) {
    return (
      <section className="ui basic segment padded-bottom">
        <Loader active={isFetching} inline />
      </section>
    );
  }
  return (
    <section className="ui basic segment padded-bottom">
      <h1 className={cx('ui header', NO_LOCALIZE)}>
        {`${customer.givenName} ${customer.surname}`}
      </h1>
      <CustomerHeader customerId={customer.id} />
      {children}
    </section>
  );
};

CustomerView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  customer: PropTypes.shape({
    email: PropTypes.string,
    givenName: PropTypes.string,
    surname: PropTypes.string
  })
};

export default CustomerView;
