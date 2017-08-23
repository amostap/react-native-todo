import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import styles from './styles';
import globalStyles from '../../globalStyles';

const TaskRow = ({ todo, onDone, onUndone, onDelete }) => {
  const { doneContainer, container, text, doneText, buttonContainer } = styles;

  return (
    <View style={[container, todo.state === 'done' && doneContainer]}>
      <View style={buttonContainer}>
        {
          todo.state === 'done'
            ? (
              <TouchableOpacity
                onPress={() => onUndone(todo)}
              >
                <MaterialIcon
                  color={globalStyles.colors.green}
                  name="check"
                  size={28}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onDone(todo)}
              >
                <MaterialIcon
                  color={globalStyles.colors.red}
                  name="radio-button-unchecked"
                  size={28}
                />
              </TouchableOpacity>
            )
        }
      </View>
      <Text style={[text, todo.state === 'done' && doneText]}>
        { todo.task }
      </Text>
      <View style={buttonContainer}>
        <TouchableOpacity
          onPress={() => onDelete(todo)}
        >
          <OcticonsIcon
            color={globalStyles.colors.yellow}
            name="trashcan"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

TaskRow.propTypes = {
  onDone: PropTypes.func.isRequired,
  onUndone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    task: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskRow;
