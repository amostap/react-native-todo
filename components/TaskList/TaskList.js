import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Switch,
} from 'react-native';
import TaskRow from '../TaskRow/TaskRow';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#E0F2F1',
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#4DB6AC',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
  },
  toggleText: {
    marginLeft: 20,
  },
  switchView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default class TaskList extends Component {
  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.todos),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);
    this.setState({ dataSource });
  }

  renderRow(todo) {
    return <TaskRow todo={todo} onDone={this.props.onDone} />;
  }

  render() {
    const { filter, todos, onAddStarted } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.switchView}>
          <Switch
            onValueChange={this.props.onToggle}
            value={filter !== 'pending'}
          />
          <Text style={styles.toggleText}>
            {`Showing ${todos.length} ${filter} todo(s)`}
          </Text>
        </View>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={onAddStarted}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

TaskList.propTypes = {
  filter: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddStarted: PropTypes.func.isRequired,
};
