import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ListView,
  Text,
  TouchableHighlight,
  Switch,
} from 'react-native';
import TaskRow from '../../components/TaskRow/TaskRow';
import styles from './styles';

export default class TaskList extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    onDone: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAddStarted: PropTypes.func.isRequired,
  };

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
    const { dataSource } = this.state;
    const { filter, todos, onAddStarted, onToggle } = this.props;
    const { container, switchView, toggleText, button, buttonText, buttonContainer } = styles;

    return (
      <View style={container}>
        <View style={switchView}>
          <Switch
            onValueChange={onToggle}
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
        <View style={buttonContainer}>
          <TouchableHighlight
            style={button}
            onPress={onAddStarted}
          >
            <Text style={buttonText}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
