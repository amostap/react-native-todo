import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';

export default class TaskForm extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

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
