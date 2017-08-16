import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ListView, Text, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { doneTodo, toggleState, deleteTodo } from '../../actions/todos';
import { logOut } from '../../actions/auth';
import TaskRow from '../../components/TaskRow/TaskRow';
import styles from './styles';

class TaskList extends Component {
  static navigationOptions = {
    title: 'Tasks',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    filter: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    doneTodo: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.todos),
      todos: this.props.todos,
      filter: this.props.filter,
    };

    this.onDone = this.onDone.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.onLogoutPressed = this.onLogoutPressed.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);
    this.setState({
      dataSource,
      todos: nextProps.todos,
      filter: nextProps.filter,
    });
  }

  onDone(todo) {
    this.props.doneTodo(todo);
  }

  onToggle() {
    this.props.toggleState();
  }

  onDelete(todo) {
    this.props.deleteTodo(todo);
  }

  onLogoutPressed() {
    this.props.logOut();
  }

  renderRow(todo) {
    return (
      <TaskRow
        todo={todo}
        onDone={this.onDone}
        onDelete={t => this.onDelete(t)}
      />
    );
  }

  render() {
    const { dataSource, filter, todos } = this.state;
    const { navigation } = this.props;
    const { container, switchView, toggleText, button, buttonText, logOutbutton } = styles;

    return (
      <View style={container}>
        <View style={switchView}>
          <Switch
            onValueChange={this.onToggle}
            value={filter !== 'pending'}
          />
          <Text style={toggleText}>
            {`Showing ${todos.length} ${filter} todo(s)`}
          </Text>
        </View>
        <ListView
          enableEmptySections
          dataSource={dataSource}
          renderRow={this.renderRow}
        />
        <TouchableOpacity
          style={button}
          onPress={() => navigation.navigate('TaskForm')}
        >
          <Icon
            name="add"
            style={buttonText}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[button, logOutbutton]}
          onPress={() => this.onLogoutPressed()}
        >
          <Text>log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ todos: { todos, filter } }) => ({ todos, filter });

export default connect(mapStateToProps, { doneTodo, toggleState, logOut, deleteTodo })(TaskList);
