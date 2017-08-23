import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import styles from './styles';
import globalStyles from '../../globalStyles';

const Input = ({ style, ...props }) => {
  const color = globalStyles.colors.transparentWhite;
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
