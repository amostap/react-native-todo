import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0F2F1',
    flex: 1,
    justifyContent: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  button: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
  },
  cancel: {
    backgroundColor: '#EF5350',
  },
});

export default class TaskForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onAddPressed = this.onAddPressed.bind(this);
  }

  onChange(text) {
    this.task = text;
  }

  onAddPressed() {
    this.props.onAdd(this.task);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.onChange}
        />
        <View style={styles.horizontalContainer}>
          <TouchableHighlight style={styles.button} onPress={this.onAddPressed}>
            <Text style={styles.buttonText}>
              Add
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, styles.cancel]} onPress={this.props.onCancel}>
            <Text style={styles.buttonText}>
              Cancel
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

TaskForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
