const defaultState = { user: {}, isLoggedIn: false };

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state, user: action.value.profileObj, isLoggedIn: true,
        // , auth: action.value.accessToken
      };
    case 'LOG_OUT':
      return { ...state, user: {}, isLoggedIn: false };
    default:
      return state;
  }
};
