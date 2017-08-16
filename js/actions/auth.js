import * as firebase from 'firebase';
import {
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
      .then(() => { dispatch({ type: LOG_IN_SUCCESS }); })
      .catch((err) => { dispatch({ type: LOG_IN_FAIL, message: err.message }); });
  };
};

export const singUp = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOADING });
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { dispatch({ type: SIGN_UP_SUCCESS }); })
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
