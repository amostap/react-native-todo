import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const Spinner = ({ size }) => (
  <View style={styles.container}>
    <ActivityIndicator
      size={size}
    />
  </View>
);

Spinner.defaultProps = {
  size: 'large',
};

Spinner.propTypes = {
  size: PropTypes.string,
};

export default Spinner;
