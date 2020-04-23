import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddButton from './AddButton';
import Dialog from './Dialog';
import LoggedInContent from '../LoggedInContent';

const Journal = ({ className, isOpen, setIsOpen }) => (
  <LoggedInContent className={className} requiresUserInitialization>
    <AddButton onClick={() => setIsOpen(true)} />
    <Dialog
      open={isOpen}
      cancel={() => setIsOpen(false)}
    />
  </LoggedInContent>
);

Journal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isOpen: state.modals.journalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  setIsOpen: (value) => dispatch({ type: value ? 'OPEN_JOURNAL' : 'CLOSE_MODALS' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
