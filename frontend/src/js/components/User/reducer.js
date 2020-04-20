const defaultState = {
  user: { name: '', email: '', imageUrl: '' },
  isLoggedIn: false,
  loginLoading: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.value.profileObj,
        isLoggedIn: true,
        loginLoading: false,
      };
    case 'LOG_OUT':
      return {
        ...state, user: {}, isLoggedIn: false, loginLoading: false,
      };
    default:
      return state;
  }
};
