import React from 'react';
import {
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  doneButton: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d7d7d7',
  },
  image: {
    width: 50,
    height: 27,
  },
});

export default function render(baseStyles) {
  return (
    <View style={[baseStyles.container, styles.row]}>
      <Text style={baseStyles.label}>
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
