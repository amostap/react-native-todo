import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Button = ({ onPress, title, color }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.touchable, { backgroundColor: color }]}
  >
    <Text style={styles.text}>
      {title}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Button;
