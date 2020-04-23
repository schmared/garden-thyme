const defaultState = {
  userSettingsOpen: false,
  journalOpen: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'OPEN_SETTINGS':
      return {
        ...state,
        userSettingsOpen: true,
        journalOpen: false,
      };
    case 'OPEN_JOURNAL':
      return {
        ...state,
        userSettingsOpen: false,
        journalOpen: true,
      };
    case 'CLOSE_MODALS':
      return {
        ...state,
        userSettingsOpen: false,
        journalOpen: false,
      };
    default:
      return state;
  }
};
