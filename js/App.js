import React, { Component } from 'react';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import { addTodo, doneTodo, toggleState } from './actions/todos';
import store from './redusers/todos';
import TaskForm from './screens/TaskForm/TaskForm';
import TaskList from './screens/TaskList/TaskList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState());
    });

    this.onAddStarted = this.onAddStarted.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onAddStarted() {
    this.nav.push({
      name: 'taskform',
    });
  }

  onCancel() {
    this.nav.pop();
  }

  onAdd(task) {
    store.dispatch({
      type: 'ADD_TODO',
      task,
    });
    this.nav.pop();
  }

  onDone(todo) {
    store.dispatch({
      type: 'DONE_TODO',
      todo,
    });
  }

  onToggle() {
    store.dispatch({
      type: 'TOGGLE_STATE',
    });
  }

  configureScene = () => NavigationExperimental.Navigator.SceneConfigs.FloatFromBottom;

  renderScene(route) {
    switch (route.name) {
      case 'taskform':
        return (
          <TaskForm
            onCancel={this.onCancel}
            onAdd={this.onAdd}
          />
        );
      default:
        return (
          <TaskList
            filter={this.state.filter}
            todos={this.state.todos}
            onAddStarted={this.onAddStarted}
            onDone={this.onDone}
            onToggle={this.onToggle}
          />
        );
    }
  }

  render() {
    return (
      <NavigationExperimental.Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'listview', index: 0 }}
        ref={(nav) => {
          this.nav = nav;
        }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default connect(null, null)(App);
