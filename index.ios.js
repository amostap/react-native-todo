import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import App from './js/App';
import Store from './js/redusers';

const AppWithStore = () => (
  <Provider store={createStore(Store, {}, applyMiddleware(ReduxThunk))}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('amTodo', () => AppWithStore);
