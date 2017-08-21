import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import TaskListNavigator from './navigation/TaskListNavigator';
import Login from './screens/Login/Login';
import Spinner from './components/Spinner/Spinner';
import config from './config';
import styles from './app.styles';

export default class App extends Component {
  state = {
    isUserLoggedIn: null,
  }

  componentWillMount() {
    firebase.initializeApp(config);
    this.checkAuth();
  }

  checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isUserLoggedIn: true,
        });
      } else {
        this.setState({
          isUserLoggedIn: false,
        });
      }
    });
  }

  render() {
    const { app, appPreload } = styles;
    const { isUserLoggedIn } = this.state;

    if (isUserLoggedIn === null) {
      return (
        <View style={[app, appPreload]}>
          <Spinner />
        </View>
      );
    }
    return (
      <View style={app}>
        <StatusBar
          backgroundColor="#383846"
          barStyle="light-content"
        />
        { isUserLoggedIn
          ? <TaskListNavigator />
          : <Login />
        }
      </View>
    );
  }
}
