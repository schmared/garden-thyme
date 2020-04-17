import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsDialog from './SettingsDialog';


const Settings = () => {
  const [open, setOpen] = useState(false);

  return (
    <div id="user-settings">
      <IconButton
        alt="Edit User Settings"
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
      </IconButton>
      <SettingsDialog open={open} close={() => setOpen(false)} />
    </div>
  );
};

export default Settings;
