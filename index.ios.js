import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './js/navigation';
import todoStore from './js/redusers/todos';

const store = createStore(todoStore);

const AppWithRedux = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent('amTodo', () => AppWithRedux);
