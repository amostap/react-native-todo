import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const TaskRow = ({ todo, onDone, onDelete }) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      { todo.task }
    </Text>
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onDone(todo)}
      >
        <Icon
          name="done"
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onDelete(todo)}
      >
        <Icon
          name="clear"
          size={24}
        />
      </TouchableOpacity>
    </View>
  </View>
);

TaskRow.propTypes = {
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    task: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskRow;
