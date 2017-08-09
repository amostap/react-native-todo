import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import styles from './styles';
import doneImage from '../../../assets/images/done.png';

const TaskRow = ({ todo, onDone }) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      { todo.task }
    </Text>
    <TouchableHighlight
      onPress={() => onDone(todo)}
      underlayColor="#d7d7d7"
    >
      <Image
        style={styles.image}
        source={doneImage}
      />
    </TouchableHighlight>
  </View>
);

TaskRow.propTypes = {
  onDone: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    task: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskRow;
