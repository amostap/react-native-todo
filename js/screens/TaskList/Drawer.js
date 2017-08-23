import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, Text, View } from 'react-native';
import { logOut } from '../../actions/auth';
import styles from './styles';

class Drawer extends Component {
  static propTypes = {
    logOut: PropTypes.func.isRequired,
    userEmail: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.onLogoutPressed = this.onLogoutPressed.bind(this);
  }

  onLogoutPressed() {
    this.props.logOut();
  }

  render() {
    const { drawerContainer, logoutButton, text, infoText } = styles;

    return (
      <View style={drawerContainer}>
        <Text style={text}>{this.props.userEmail}</Text>
        <TouchableOpacity
          onPress={() => this.onLogoutPressed()}
          style={logoutButton}
        >
          <Text style={text}>Logout</Text>
        </TouchableOpacity>
        <Text style={infoText}>v 0.1.0</Text>
      </View>
    );
  }
}

export default connect(null, { logOut })(Drawer);
