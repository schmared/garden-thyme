import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const AddButton = ({ onClick }) => {
  const theme = useTheme();
  const displayWords = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Fab
      aria-label="Log what you did today"
      color="primary"
      variant="extended"
      onClick={onClick}
    >
      <LibraryBooksIcon />
      &nbsp;
      {displayWords && 'Journal'}
    </Fab>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
