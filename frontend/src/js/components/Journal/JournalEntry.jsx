import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import api from './api';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const customPastTense = {
  Repot: 'Repotted',
  Prune: 'Pruned',
  Remove: 'Removed',
};
const pastTense = (presentTense) => {
  if (customPastTense[presentTense]) {
    return customPastTense[presentTense];
  }
  return `${presentTense}ed`;
};

const JournalEntry = ({
  value, types, userSettings, entryDateTime,
}) => {
  const classes = useStyles();
  const [entryType, setEntryType] = useState(value.entryType);
  const [quantity, setQuantity] = useState(value.quantity);
  const [plantId, setPlantId] = useState(value.plantId); // eslint-disable-line
  const [mutateEntry, { status }] = api.usePostEntry();

  // when editing, grab focus on first select

  const save = () => {
    mutateEntry({
      ...value,
      ...userSettings,
      id: value.id === 0 ? null : value.id,
      quantity: parseInt(quantity, 10),
      entryType,
      entryDateTime,
      plantId,
    });
  };

  console.log(status);

  return (
    <form>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor={`journal-type-label-${value.id}`}>
          Action
        </InputLabel>
        <Select
          labelId={`journal-type-label-${value.id}`}
          id={`journal-type-${value.id}`}
          value={entryType}
          onChange={(e) => setEntryType(e.target.value)}
        >
          {types.map((type) => (
            <MenuItem value={type.id} key={type.id}>
              {pastTense(type.value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id={`journal-quantity-${value.id}`}
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id={`journal-plant-${value.id}`}
          label="Plant Variety"
          type="text"
          value={plantId}
          onChange={(e) => setPlantId(e.target.value)}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button
          onClick={save}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </FormControl>
    </form>
  );
};

JournalEntry.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number,
    entryType: PropTypes.number,
    entryDateTime: PropTypes.string,
    quantity: PropTypes.number,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    plantId: PropTypes.string,
  }).isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  })).isRequired,
  userSettings: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  entryDateTime: PropTypes.string.isRequired,
};

export default JournalEntry;
