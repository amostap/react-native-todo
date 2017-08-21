import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import styles from './styles';

const Input = ({ style, ...props }) => {
  const color = 'rgba(255, 255, 255, 0.6)';
  return (
    <TextInput
      {...props}
      selectionColor={color}
      underlineColorAndroid={color}
      placeholderTextColor={color}
      style={[styles.input, style]}
    />
  );
};

Input.defaultProps = {
  style: {},
};

Input.propTypes = {
  style: PropTypes.object,
};

export default Input;
