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
    const { container, input, horizontalContainer, button, buttonText, cancel } = styles;

    return (
      <View style={container}>
        <TextInput
          style={input}
          onChangeText={this.onChange}
        />
        <View style={horizontalContainer}>
          <TouchableHighlight style={button} onPress={() => this.onAddPressed(this.task)}>
            <Text style={buttonText}>
              Add
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[button, cancel]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={buttonText}>
              Cancel
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
