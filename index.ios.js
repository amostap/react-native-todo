import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './js/App';
import AppStore from './js/redusers';

const store = createStore(AppStore);

const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('amTodo', () => AppWithRedux);
