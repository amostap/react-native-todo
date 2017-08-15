import {
  TOGGLE_STATE,
  DONE_TODO,
  ADD_TODO,
} from './types';

export const addTodo = (task) => {
  return {
    type: ADD_TODO,
    task,
  };
};

export const doneTodo = (todo) => {
  return {
    type: DONE_TODO,
    todo,
  };
};

export const toggleState = () => {
  return {
    type: TOGGLE_STATE,
  };
};
