import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { checkAuth } from './actions/auth';
import TaskListNavigator from './navigation/TaskListNavigator';
import Login from './screens/Login/Login';
import Logo from './components/Logo/Logo';
import config from './config';
import styles from './app.styles';
import globalStyles from './globalStyles';

class App extends Component {
  static propTypes = {
    checkAuth: PropTypes.func.isRequired,
  };

  state = {
    isUserLoggedIn: null,
  }

  componentWillMount() {
    firebase.initializeApp(config);
    this.checkAuth();
  }

  checkAuth() {
    // TODO: move this to redux
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isUserLoggedIn: true,
        }, () => this.props.checkAuth(user));
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
          <Logo />
        </View>
      );
    }
    return (
      <View style={app}>
        <StatusBar
          backgroundColor={globalStyles.colors.darkGray}
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

export default connect(null, { checkAuth })(App);
