/*
The connect() function connects this component to the store.
It accepts mapStateToProps as the first argument, Action Creators as the second argument.
We will be able to use the store state as Props by specifying mapStateToProps.

Modal:
Define the helper functions that display the content and the action buttons on the modal window.
Then, pass them as Props to the Modal component.
onDismiss is set to return to the index page when the dim part of the modal window is clicked.
We can retrieve the data from its own props by specifying ownProps as the second argument to mapStateToProps.
*/

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../layout/Modal';
import history from '../../history';
import { getTodo, deleteTodo } from '../../actions/todos';

class TodoDelete extends Component {
  componentDidMount() {
    this.props.getTodo(this.props.match.params.id);
  }

  renderContent() {
    if (!this.props.todo) {
      return 'Are you sure you want to delete this task?';
    }
    return `Are you sure you want to delete the task: ${this.props.todo.task}`;
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteTodo(id)}
          className='ui negative button'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </Fragment>
    );
  }

  render() {
    return (
      <Modal
        title='Delete Todo'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.match.params.id]
});

export default connect(
  mapStateToProps,
  { getTodo, deleteTodo }
)(TodoDelete);