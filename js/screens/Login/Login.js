import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { logIn, singUp } from '../../actions/auth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Logo from '../../components/Logo/Logo';
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
    const { container, contentContainer, infoContainer,
      messageStyle } = styles;
    const { password, email } = this.state;
    const { loading, message } = this.props;

    return (
      <View style={container}>
        <Logo />
        <View style={contentContainer}>
          <View>
            <Input
              keyboardType="email-address"
              placeholder="Email"
              value={email}
              onChangeText={v => this.onChangeText('email', v)}
            />
            <Input
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={v => this.onChangeText('password', v)}
            />
            <View style={infoContainer}>
              {
                loading
                  ? <Spinner />
                  : <Text style={messageStyle}>{ message }</Text>
              }
            </View>
          </View>
          <View>
            <Button
              color="#CA0E13"
              title="Login"
              onPress={() => this.onLoginPressed(email, password)}
            />
            <Button
              color="#4A4959"
              title="Sign Up"
              onPress={() => this.onSignUpPressed(email, password)}
            />
          </View>
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
