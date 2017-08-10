import React, { Component } from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDO-nw5ouZO9EqDFJEiV9XAPEwwk8pC9pY',
  authDomain: 'react-native-todo-f38d5.firebaseapp.com',
  databaseURL: 'https://react-native-todo-f38d5.firebaseio.com',
  projectId: 'react-native-todo-f38d5',
  storageBucket: 'react-native-todo-f38d5.appspot.com',
  messagingSenderId: '737398168393',
};

export default class Login extends Component {
  static navigationOptions = {
    title: 'Auth/Login',
  };

  constructor(props, context) {
    super(props, context);

    this.onChangeText = this.onChangeText.bind(this);
    this.onConfirmForm = this.onConfirmForm.bind(this);
  }

  state = {
    email: '',
    password: '',
    error: '',
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  onConfirmForm(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch(() => {
            this.setState({
              error: 'Error',
            });
          });
      });
  }

  componentDidMound() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  render() {
    const { container, input, button, buttonText } = styles;
    const { error, password, email } = this.state;

    return (
      <View style={container}>
        <Text>
          { error }
        </Text>
        <TextInput
          placeholder="email"
          style={input}
          onChangeText={v => this.onChangeText('email', v)}
        />
        <TextInput
          secureTextEntry
          placeholder="password"
          style={input}
          onChangeText={v => this.onChangeText('password', v)}
        />
        <TouchableOpacity
          style={button}
          onPress={() => this.onConfirmForm(email, password)}
        >
          <Icon
            name="account-circle"
            style={buttonText}
            size={22}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
