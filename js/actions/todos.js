import * as firebase from 'firebase';
import {
  GET_TODOS_SUCCESS,
  DONE_TODO,
  DELETE_TODO,
  LOADING,
  UNDONE_TODO,
} from './types';

export const getTodos = () => {
  return (dispatch) => {
    dispatch({ type: LOADING });
    firebase.database().ref(`/allTodos/${firebase.auth().currentUser.uid}/todos`)
      .on('value', (snapshot) => {
        dispatch({ type: GET_TODOS_SUCCESS, todos: snapshot.val() });
      });
  };
};

export const addTodo = (task) => {
  return () => {
    firebase.database().ref(`/allTodos/${firebase.auth().currentUser.uid}/todos`)
      .push({ task, state: 'pending' });
  };
};

export const deleteTodo = (todo) => {
  return (dispatch) => {
    firebase.database().ref(`/allTodos/${firebase.auth().currentUser.uid}/todos/${todo.id}`)
      .remove()
      .then(() => dispatch({ type: DELETE_TODO, todo }));
  };
};

export const doneTodo = (todo) => {
  return (dispatch) => {
    firebase.database().ref(`/allTodos/${firebase.auth().currentUser.uid}/todos/${todo.id}`)
      .set({ task: todo.task, state: 'done' })
      .then(() => dispatch({ type: DONE_TODO, todo }));
  };
};

export const undoneTodo = (todo) => {
  return (dispatch) => {
    firebase.database().ref(`/allTodos/${firebase.auth().currentUser.uid}/todos/${todo.id}`)
      .set({ task: todo.task, state: 'pending' })
      .then(() => dispatch({ type: UNDONE_TODO, todo }));
  };
};
