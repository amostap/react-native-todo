import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ListView, Text, TouchableOpacity, Switch, DrawerLayoutAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { doneTodo, toggleState, deleteTodo, getTodos } from '../../actions/todos';
import TaskRow from '../../components/TaskRow/TaskRow';
import Drawer from './Drawer';
import Spinner from '../../components/Spinner/Spinner';
import styles from './styles';

class TaskList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let a = 1;

    return {
      title: 'TODOs',
      headerTitleStyle: {
        color: 'rgba(255, 255, 255, 0.5)',
      },
      headerStyle: {
        backgroundColor: '#383846',
      },
      headerRight: (
        <TouchableOpacity
          // TODO: rewrite this
          onPress={() => {
            a % 2 === 0 ? params.onOpenDrawer() : params.onCloseDrawer();
            a += 1;
          }}
        >
          <Icon
            style={styles.menuIcon}
            name="menu"
            size={26}
          />
        </TouchableOpacity>
      ),
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    filter: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    doneTodo: PropTypes.func.isRequired,
    toggleState: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    getTodos: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.todos),
    };

    this.onDone = this.onDone.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onOpenDrawer = this.onOpenDrawer.bind(this);
    this.onCloseDrawer = this.onCloseDrawer.bind(this);
  }

  componentWillMount() {
    this.props.getTodos();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onOpenDrawer: this.onOpenDrawer,
      onCloseDrawer: this.onCloseDrawer,
    });
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);
    this.setState({
      dataSource,
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

  onOpenDrawer() {
    this.drawer.openDrawer();
  }

  onCloseDrawer() {
    this.drawer.closeDrawer();
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
    const { dataSource } = this.state;
    const { navigation, todos, filter, loading } = this.props;
    const { container, switchView, toggleText, button, buttonText } = styles;

    return (
      <DrawerLayoutAndroid
        drawerBackgroundColor="#3E3D4B"
        drawerWidth={300}
        ref={ref => this.drawer = ref}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <Drawer />}
      >
        <View style={container}>
          <View style={switchView}>
            <Switch
              onValueChange={this.onToggle}
              value={filter !== 'pending'}
            />
            <Text style={[buttonText, toggleText]}>
              {`Showing ${todos.length} ${filter} todo(s)`}
            </Text>
          </View>
          { loading
            ? <Spinner />
            : (
              <ListView
                enableEmptySections
                dataSource={dataSource}
                renderRow={this.renderRow}
              />
            )
          }
          <TouchableOpacity
            style={button}
            onPress={() => navigation.navigate('TaskForm')}
          >
            <Icon
              name="add"
              style={buttonText}
              size={36}
            />
          </TouchableOpacity>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const mapStateToProps = ({ todos }) => {
  return {
    todos: todos.todos,
    filter: todos.filter,
    loading: todos.loading,
  };
};

export default connect(
  mapStateToProps,
  { doneTodo, toggleState, deleteTodo, getTodos },
)(TaskList);
