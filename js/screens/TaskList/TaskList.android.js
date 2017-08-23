import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ListView, TouchableOpacity, DrawerLayoutAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { doneTodo, deleteTodo, getTodos, undoneTodo } from '../../actions/todos';
import TaskRow from '../../components/TaskRow/TaskRow';
import Drawer from './Drawer';
import Spinner from '../../components/Spinner/Spinner';
import styles from './styles';
import globalStyles from '../../globalStyles';

class TaskList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let a = 1;

    return {
      title: 'TODO',
      headerTitleStyle: {
        color: globalStyles.colors.transparentWhite,
      },
      headerStyle: {
        backgroundColor: globalStyles.colors.gray,
      },
      headerRight: (
        <TouchableOpacity
          // TODO: rewrite this shit
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
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    doneTodo: PropTypes.func.isRequired,
    undoneTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    getTodos: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    userEmail: PropTypes.string.isRequired,
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
    this.onUndone = this.onUndone.bind(this);
    this.onDelete = this.onDelete.bind(this);
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

  onUndone(todo) {
    this.props.undoneTodo(todo);
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
        onUndone={this.onUndone}
        onDelete={t => this.onDelete(t)}
      />
    );
  }

  render() {
    const { dataSource } = this.state;
    const { navigation, loading, userEmail } = this.props;
    const { container, button, buttonText, listView } = styles;

    return (
      <DrawerLayoutAndroid
        drawerBackgroundColor={globalStyles.colors.gray}
        drawerWidth={300}
        ref={ref => this.drawer = ref}
        drawerPosition={DrawerLayoutAndroid.positions.Right}
        renderNavigationView={() => <Drawer userEmail={userEmail} />}
      >
        <View style={container}>
          { loading
            ? <Spinner />
            : (
              <ListView
                contentContainerStyle={listView}
                contentInset={{ bottom: 49 }}
                automaticallyAdjustContentInsets={false}
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

const mapStateToProps = ({ todos, auth }) => {
  return {
    userEmail: auth.user.email,
    todos: todos.todos,
    loading: todos.loading,
  };
};

export default connect(
  mapStateToProps,
  { doneTodo, deleteTodo, getTodos, undoneTodo },
)(TaskList);
