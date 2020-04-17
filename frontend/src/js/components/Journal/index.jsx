import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddButton from './AddButton';
import Dialog from './Dialog';

const Journal = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <AddButton onClick={() => setIsOpen(true)} />
      <Dialog
        open={isOpen}
        cancel={() => setIsOpen(false)}
      />
    </div>
  );
};

Journal.propTypes = {
  className: PropTypes.string,
};

Journal.defaultProps = {
  className: '',
};

export default Journal;
