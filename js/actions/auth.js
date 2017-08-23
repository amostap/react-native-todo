import * as firebase from 'firebase';
import {
  CHECK_AUTH,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
  LOADING,
} from './types';

export const logIn = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOADING });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => { dispatch({ type: LOG_IN_SUCCESS, email: res.email }); })
      .catch((err) => { dispatch({ type: LOG_IN_FAIL, message: err.message }); });
  };
};

export const checkAuth = ({ email }) => {
  return {
    type: CHECK_AUTH,
    email,
  };
};

export const singUp = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOADING });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((res) => { dispatch({ type: SIGN_UP_SUCCESS, email: res.email }); })
      .catch((err) => { dispatch({ type: SIGN_UP_FAIL, message: err.message }); });
  };
};

export const logOut = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => { dispatch({ type: LOG_OUT_SUCCESS }); })
      .catch((err) => { dispatch({ type: LOG_OUT_FAIL, message: err.message }); });
  };
};
