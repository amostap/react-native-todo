import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const TaskRow = ({ todo, onDone, onDelete }) => (
  <View style={styles.container}>
    <Text style={styles.taskText}>
      { todo.task }
    </Text>
    <View style={styles.buttonsContainer}>
      {
        todo.state !== 'done'
          && (
            <TouchableOpacity
              onPress={() => onDone(todo)}
              style={styles.button}
            >
              <Icon
                color="#46AB17"
                name="done"
                size={24}
              />
            </TouchableOpacity>
          )
      }
      <TouchableOpacity
        onPress={() => onDelete(todo)}
      >
        <Icon
          color="#D2AD22"
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
