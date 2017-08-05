import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Render from './Render';

const baseStyles = StyleSheet.create({
  container: {
    borderRadius: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
  },
});

export default class TaskRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDonePressed = this.onDonePressed.bind(this);
  }

  onDonePressed() {
    this.props.onDone(this.props.todo);
  }

  render() {
    return Render.bind(this)(baseStyles);
  }
}

TaskRow.propTypes = {
  onDone: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    task: PropTypes.string.isRequired,
  }).isRequired,
};
