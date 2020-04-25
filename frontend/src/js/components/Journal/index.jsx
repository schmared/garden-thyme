import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddButton from './AddButton';
import Dialog from './Dialog';
import api from '../User/api';

const Journal = ({
  className, isOpen, setIsOpen, loginLoading, isLoggedIn, loggedInUser,
}) => {
  const { data: settings, error, isFetching } = api.useGetSettings(loggedInUser.googleId);

  if (isFetching || loginLoading || !isLoggedIn || error) {
    return null;
  }

  const userIsInitialized = !!settings && settings.userId !== '0';

  if (!userIsInitialized) {
    return null;
  }

  return (
    <div className={className} requiresUserInitialization>
      <AddButton onClick={() => setIsOpen(true)} />
      <Dialog
        open={isOpen}
        cancel={() => setIsOpen(false)}
      />
    </div>
  );
};

Journal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.shape({ googleId: PropTypes.string }).isRequired,
  loginLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isOpen: state.modals.journalOpen,
  loggedInUser: state.settings.user,
  isLoggedIn: state.settings.isLoggedIn,
  loginLoading: state.settings.loginLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setIsOpen: (value) => dispatch({ type: value ? 'OPEN_JOURNAL' : 'CLOSE_MODALS' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
