import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import SettingsDialog from './SettingsDialog';


const Settings = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const googleResponse = (response) => {
    console.log(response);
    setIsLoggedIn(true);
  };

  // Make it do like this one https://github.com/premdas92/GoogleLogin/blob/master/src/App.js

  return (
    <div id="user-settings">
      {!isLoggedIn && (
        <GoogleLogin
          clientId="190581999051-9d8pjkd18pcgd1o56i96s15u03el7ne7.apps.googleusercontent.com"
          onSuccess={googleResponse}
          onFailure={googleResponse}
          isSignedIn
          cookiePolicy="single_host_origin"
        />
      )}
      {isLoggedIn && (
        <GoogleLogout onLogoutSuccess={() => setIsLoggedIn(false)} />
      )}

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
