import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddButton from './AddButton';
import Dialog from './Dialog';
import LoggedInContent from '../LoggedInContent';

const Journal = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LoggedInContent className={className} requiresUserInitialization>
      <AddButton onClick={() => setIsOpen(true)} />
      <Dialog
        open={isOpen}
        cancel={() => setIsOpen(false)}
      />
    </LoggedInContent>
  );
};

Journal.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Journal;
