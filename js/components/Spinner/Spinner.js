import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const Spinner = ({ size, color }) => (
  <View style={styles.container}>
    <ActivityIndicator
      size={size}
      color={color}
    />
  </View>
);

Spinner.defaultProps = {
  size: 'large',
  color: '#D2D2D5',
};

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;
