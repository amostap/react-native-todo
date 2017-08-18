import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { logIn, singUp } from '../../actions/auth';
import Spinner from '../../components/Spinner/Spinner';
import styles from './styles';

class Login extends Component {
  static defaultProps = {
    message: '',
  };

  static propTypes = {
    logIn: PropTypes.func.isRequired,
    singUp: PropTypes.func.isRequired,
    message: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.onLoginPressed = this.onLoginPressed.bind(this);
    this.onSignUpPressed = this.onSignUpPressed.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  state = {
    email: '',
    password: '',
  }

  onLoginPressed(email, password) {
    this.props.logIn({ email, password });
  }

  onSignUpPressed(email, password) {
    this.props.singUp({ email, password });
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { container, input, button, messageStyle, buttonsContainer, link } = styles;
    const { password, email } = this.state;
    const { loading, message } = this.props;

    return (
      <View style={container}>
        { loading
          ? <Spinner />
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

const mapStateToProps = ({ auth: { message, loading } }) => ({
  message,
  loading,
});

export default connect(mapStateToProps, { logIn, singUp })(Login);
