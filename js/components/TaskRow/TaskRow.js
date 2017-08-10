import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const TaskRow = ({ todo, onDone }) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      { todo.task }
    </Text>
    <TouchableOpacity
      onPress={() => onDone(todo)}
    >
      <Icon
        name="done"
        size={24}
      />
    </TouchableOpacity>
  </View>
);

TaskRow.propTypes = {
  onDone: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    task: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskRow;
