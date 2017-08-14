import { StackNavigator } from 'react-navigation';
import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList';

const TaskListNavigator = StackNavigator({
  TaskList: { screen: TaskList },
  TaskForm: { screen: TaskForm },
});

export default TaskListNavigator;
