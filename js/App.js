import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import { addTodo, doneTodo, toggleState } from './actions/todos';
import TaskForm from './screens/TaskForm/TaskForm';
import TaskList from './screens/TaskList/TaskList';

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    allTodos: state.allTodos,
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => {
      dispatch(addTodo(todo));
    },
    doneTodo: (todo) => {
      dispatch(doneTodo(todo));
    },
    toggleState: () => {
      dispatch(toggleState());
    },
  };
};

class App extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
    doneTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    allTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.onAddStarted = this.onAddStarted.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  state = {
    todos: this.props.todos,
    allTodos: this.props.allTodos,
    filter: this.props.filter,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      todos: nextProps.todos,
      allTodos: nextProps.allTodos,
      filter: nextProps.filter,
    });
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
    this.props.addTodo(task);
    this.nav.pop();
  }

  onDone(todo) {
    this.props.doneTodo(todo);
  }

  onToggle() {
    this.props.toggleState();
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
