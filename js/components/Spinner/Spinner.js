import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import globalStyles from '../../globalStyles';

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
  color: globalStyles.colors.transparentWhite,
};

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;
