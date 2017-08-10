import { StackNavigator } from 'react-navigation';
import App from './App';
import TaskForm from './screens/TaskForm/TaskForm';
import Login from './screens/Login/Login';

const SimpleApp = StackNavigator({
  App: { screen: App },
  TaskForm: { screen: TaskForm },
  Login: { screen: Login },
});

export default SimpleApp;
