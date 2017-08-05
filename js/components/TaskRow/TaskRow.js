import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import styles from './styles';

export default class TaskRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDonePressed = this.onDonePressed.bind(this);
  }

  onDonePressed() {
    this.props.onDone(this.props.todo);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          { this.props.todo.task }
        </Text>
        <TouchableHighlight
          style={styles.doneButton}
          onPress={this.onDonePressed}
          underlayColor="#d7d7d7"
        >
          <Image
            style={styles.image}
            source={{ uri: 'http://doneberlin.com/wp-content/themes/done/style/images/general/logo.png' }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

TaskRow.propTypes = {
  onDone: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    task: PropTypes.string.isRequired,
  }).isRequired,
};
