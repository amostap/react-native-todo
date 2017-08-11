import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  doneTodo,
  toggleState,
} from './actions/todos';
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
    doneTodo: (todo) => {
      dispatch(doneTodo(todo));
    },
    toggleState: () => {
      dispatch(toggleState());
    },
  };
};

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDO-nw5ouZO9EqDFJEiV9XAPEwwk8pC9pY',
  authDomain: 'react-native-todo-f38d5.firebaseapp.com',
  databaseURL: 'https://react-native-todo-f38d5.firebaseio.com',
  projectId: 'react-native-todo-f38d5',
  storageBucket: 'react-native-todo-f38d5.appspot.com',
  messagingSenderId: '737398168393',
};

class App extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  static propTypes = {
    toggleState: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    doneTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    allTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
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

  onDone(todo) {
    this.props.doneTodo(todo);
  }

  onToggle() {
    this.props.toggleState();
  }

  componentWillMound() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  render() {
    const { filter, todos } = this.state;
    const { navigation } = this.props;

    return (
      <TaskList
        filter={filter}
        todos={todos}
        onAddStarted={() => navigation.navigate('TaskForm')}
        onDone={this.onDone}
        onToggle={this.onToggle}
        navigation={navigation}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
