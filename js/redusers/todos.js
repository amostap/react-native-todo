import { filter, map, sortBy } from 'lodash';
import {
  DELETE_TODO,
  DONE_TODO,
  GET_TODOS_SUCCESS,
  LOADING,
  UNDONE_TODO,
} from '../actions/types';

const initialState = {
  todos: [],
  loading: false,
};

export default function todoStore(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      // add id to todo obj
      const todos = map(action.todos, (todo, key) => ({
        ...todo,
        id: key,
      }));
      return {
        ...state,
        todos: sortBy(todos, todo => todo.state === 'done'),
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: filter(state.todos, todo => todo.id !== action.todo.id),
      };
    case DONE_TODO:
      const doneTodo = {
        ...action.todo,
        state: 'done',
      };
      const updatedTodos = map(state.todos, todo =>
        todo.id === action.todo.id ? doneTodo : todo,
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    case UNDONE_TODO:
      const undoneTodo = {
        ...action.todo,
        state: 'pending',
      };
      const updateTodos = map(state.todos, todo =>
        todo.id === action.todo.id ? undoneTodo : todo,
      );
      return {
        ...state,
        todos: updateTodos,
      };
    default:
      return state;
  }
}
