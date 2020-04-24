import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import api from './api';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px #ddd solid',
  },
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
  value, types, userSettings, entryDateTime, onDelete,
}) => {
  const classes = useStyles();
  const [id, setId] = useState(value.id);
  const [entryType, setEntryType] = useState(value.entryType);
  const [quantity, setQuantity] = useState(value.quantity);
  const [plantId, setPlantId] = useState(value.plantId);
  const [isEditing, setIsEditing] = useState(value.id === 0);
  const [mutateEntry, { status }] = api.usePostEntry();
  const [deleteEntry, { deleteStatus }] = api.useDeleteEntry();

  // TODO when editing, grab focus on first select

  const save = async () => {
    const result = await mutateEntry({
      ...value,
      ...userSettings,
      id: id === 0 ? null : id,
      quantity: parseInt(quantity, 10),
      entryType,
      entryDateTime,
      plantId,
    });
    if (result) {
      setId(result.data.id);
      setIsEditing(false);
    }
  };

  const deleteThis = async () => {
    await deleteEntry(id);
    onDelete();
  };

  if (status === 'error') {
    // TODO this isn't working
    return <Alert severity="error">There was an error saving this entry.</Alert>;
  }

  if (isEditing) {
    return (
      <form className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <FormControl className={classes.formControl} fullWidth>
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
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                id={`journal-quantity-${value.id}`}
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl className={classes.formControl} fullWidth>
              <TextField
                id={`journal-plant-${value.id}`}
                label="Plant Variety"
                type="text"
                value={plantId}
                onChange={(e) => setPlantId(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              {status === 'loading' && <CircularProgress />}
              {status !== 'loading' && (
                <Button
                  onClick={save}
                  color="primary"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  aria-label="Save"
                >
                  Save
                </Button>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </form>
    );
  }

  return (
    <Grid container spacing={1} direction="row" justify="center" alignItems="center" className={classes.root}>
      <Grid item xs={2}>
        {pastTense(types.find((type) => type.id === entryType).value)}
      </Grid>
      <Grid item xs={2}>
        {quantity}
      </Grid>
      <Grid item xs={5}>
        {plantId}
      </Grid>
      <Grid item xs={3}>
        <ButtonGroup color="primary" variant="contained" size="small">
          <IconButton
            onClick={() => setIsEditing(true)}
            component="span"
            aria-label={`Edit Log for ${plantId}`}
          >
            <EditIcon />
          </IconButton>
          {deleteStatus === 'loading' && <CircularProgress />}
          {deleteStatus !== 'loading' && (
            <IconButton
              onClick={deleteThis}
              component="span"
              aria-label={`Delete Log for ${plantId}`}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </ButtonGroup>
      </Grid>
    </Grid>
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
  onDelete: PropTypes.func.isRequired,
};

export default JournalEntry;
