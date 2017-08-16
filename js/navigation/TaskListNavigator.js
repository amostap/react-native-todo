import { StackNavigator } from 'react-navigation';
import TaskForm from '../screens/TaskForm/TaskForm';
import TaskList from '../screens/TaskList/TaskList';

const TaskListNavigator = StackNavigator({
  TaskList: { screen: TaskList },
  TaskForm: { screen: TaskForm },
});

export default TaskListNavigator;
