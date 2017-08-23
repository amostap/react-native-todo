import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import Input from '../../components/Input/Input';
import { addTodo } from '../../actions/todos';
import styles from './styles';

class TaskForm extends Component {
  static navigationOptions = {
    title: 'New todo',
    headerTitleStyle: {
      color: 'rgba(255, 255, 255, 0.5)',
    },
    headerStyle: {
      backgroundColor: '#383846',
    },
    headerTintColor: 'rgba(255, 255, 255, 0.5)',
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

  state = {
    task: '',
  }

  onChange(text) {
    this.setState({
      task: text,
    });
  }

  onAddPressed(task = 'Empty') {
    this.props.addTodo(task);
    this.props.navigation.goBack();
  }

  render() {
    const { container, horizontalContainer, input, button, buttonText } = styles;
    const { task } = this.state;

    return (
      <View style={container}>
        <Input
          autoFocus
          placeholder="Your todo"
          onChangeText={this.onChange}
          style={input}
        />
        <View style={horizontalContainer}>
          { task.length > 0
            && (
              <TouchableOpacity
                style={button}
                onPress={() => this.onAddPressed(task)}
              >
                <Icon
                  name="send"
                  size={36}
                  style={buttonText}
                />
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    );
  }
}

export default connect(null, { addTodo })(TaskForm);
