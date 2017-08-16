import {
  ADD_TODO,
  DONE_TODO,
  TOGGLE_STATE,
  DELETE_TODO,
} from '../actions/types';

const defaultTodos = [
  {
    task: 'Make redux1',
    state: 'pending',
  },
  {
    task: 'Make it run',
    state: 'pending',
  },
];

const initialState = {
  todos: defaultTodos,
  allTodos: defaultTodos,
  filter: 'pending',
};

export default function todoStore(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      const allTodos = state.allTodos.concat([{
        task: action.task,
        state: 'pending',
      }]);
      return {
        ...state,
        allTodos,
        todos: allTodos.filter(todo => todo.state === state.filter),
      };
    case DONE_TODO:
      const doneTodo = {
        ...action.todo,
        state: 'done',
      };
      const updatedAllTodos = state.allTodos.map(todo => todo === action.todo ? doneTodo : todo);
      return {
        ...state,
        allTodos: updatedAllTodos,
        todos: updatedAllTodos.filter(todo => todo.state === state.filter),
      };
    case DELETE_TODO:
      return {
        ...state,
        allTodos: state.allTodos.filter(todo => todo !== action.todo),
        todos: state.todos.filter(todo => todo !== action.todo),
      };
    case TOGGLE_STATE:
      const filter = state.filter === 'pending' ? 'done' : 'pending';
      return {
        ...state,
        filter,
        todos: state.allTodos.filter(todo => todo.state === filter),
      };
    default:
      return state;
  }
}
