const defaultState = {
  isUserLoggedIn: false,
};

export default function authStore(state = defaultState, action) {
  switch (action.type) {
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isUserLoggedIn: true,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isUserLoggedIn: false,
      };
    default:
      return state;
  }
}
