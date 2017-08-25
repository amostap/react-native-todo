import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_FAIL,
  LOG_OUT_FAIL,
  LOADING,
  CHECK_AUTH,
} from '../actions/types';

const initialState = {
  message: '',
  loading: false,
  user: {
    email: '',
  },
};

export default function authStore(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        ...initialState,
        user: {
          ...state.user,
          email: action.email,
        },
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        ...initialState,
        user: {
          ...state.user,
          email: action.email,
        },
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case LOG_OUT_FAIL:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case CHECK_AUTH:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
        },
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
