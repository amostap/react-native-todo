import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/todos';
import styles from './styles';

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
  };
};

class TaskForm extends Component {
  static navigationOptions = {
    title: 'Add todo',
  };

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onAddPressed = this.onAddPressed.bind(this);
  }

  onChange(text) {
    this.task = text;
  }

  onAddPressed(task = 'Empty') {
    this.props.addTodo(task);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.onChange}
        />
        <View style={styles.horizontalContainer}>
          <TouchableHighlight style={styles.button} onPress={() => this.onAddPressed(this.task)}>
            <Text style={styles.buttonText}>
              Add
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, styles.cancel]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>
              Cancel
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
