import { StackNavigator } from 'react-navigation';
import App from './App';
import TaskForm from './screens/TaskForm/TaskForm';

const SimpleApp = StackNavigator({
  App: { screen: App },
  TaskForm: { screen: TaskForm },
});

export default SimpleApp;
