import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_FAIL,
  LOG_OUT_FAIL,
} from '../actions/types';

const initialState = {
  message: '',
};

export default function authStore(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        message: action.message,
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        message: action.message,
      };
    case LOG_OUT_FAIL:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
}