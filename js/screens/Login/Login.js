import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { logIn } from '../../actions/auth';
import Spinner from '../../components/Spinner/Spinner';
import styles from './styles';

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => {
      dispatch(logIn());
    },
  };
};

class Login extends Component {
  static propTypes = {
    logIn: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onSignUpPressed = this.onSignUpPressed.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  state = {
    email: '',
    password: '',
    message: '',
    loading: false,
  }

  onLoginPressed(email, password) {
    this.setState({
      loading: true,
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.props.logIn())
      .catch(err => this.showMessage(err.message));
  }

  onSignUpPressed(email, password) {
    this.setState({
      loading: true,
    });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.showMessage('Successfuly created'))
      .catch(err => this.showMessage(err.message));
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  showMessage(message) {
    this.setState({
      message,
      loading: false,
    });
  }

  render() {
    const { container, input, button, messageStyle, buttonsContainer, link } = styles;
    const { message, password, email, loading } = this.state;

    return (
      <View style={container}>
        {
          loading
            ? <Spinner size="small" />
            : <Text style={messageStyle}>{ message }</Text>
        }
        <TextInput
          placeholder="email"
          style={input}
          value={email}
          onChangeText={v => this.onChangeText('email', v)}
        />
        <TextInput
          secureTextEntry
          placeholder="password"
          style={input}
          value={password}
          onChangeText={v => this.onChangeText('password', v)}
        />
        <View style={buttonsContainer}>
          <TouchableOpacity
            style={button}
            onPress={() => this.onSignUpPressed(email, password)}
          >
            <Text style={link}>Sign Up</Text>
          </TouchableOpacity>
          <Text>or</Text>
          <TouchableOpacity
            style={button}
            onPress={() => this.onLoginPressed(email, password)}
          >
            <Text style={link}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
