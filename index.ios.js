import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './js/App';
import Store from './js/redusers';

const AppWithStore = () => (
  <Provider store={createStore(Store)}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('amTodo', () => AppWithStore);
