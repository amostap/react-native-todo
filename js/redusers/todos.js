import filter from 'lodash/filter';
import map from 'lodash/map';
import {
  DELETE_TODO,
  DONE_TODO,
  TOGGLE_STATE,
  GET_TODOS_SUCCESS,
  LOADING,
} from '../actions/types';

const initialState = {
  todos: [],
  allTodos: [],
  filter: 'pending',
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
        todos: filter(todos, todo => todo.state === state.filter),
        allTodos: todos,
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
        allTodos: filter(state.allTodos, todo => todo.id !== action.todo.id),
        todos: filter(state.todos, todo => todo.id !== action.todo.id),
      };
    case DONE_TODO:
      const doneTodo = {
        ...action.todo,
        state: 'done',
      };
      const updatedAllTodos = map(state.allTodos, todo =>
        todo.id === action.todo.id ? doneTodo : todo,
      );
      return {
        ...state,
        allTodos: updatedAllTodos,
        todos: filter(updatedAllTodos, todo => todo.state === state.filter),
      };
    case TOGGLE_STATE:
      const todoFilter = state.filter === 'pending' ? 'done' : 'pending';
      return {
        ...state,
        filter: todoFilter,
        todos: filter(state.allTodos, todo => todo.state === todoFilter),
      };
    default:
      return state;
  }
}
