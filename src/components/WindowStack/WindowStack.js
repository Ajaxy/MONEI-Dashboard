import React, {PropTypes} from 'react';

const WindowStack = ({modals}) => (
  <div>
    {modals.map(modal => {
      let Component = modal.component;
      return <Component key={modal.id} {...modal.props}/>;
    })}
  </div>
);

WindowStack.propTypes = {
  modals: PropTypes.array.isRequired,
};

export default WindowStack;
