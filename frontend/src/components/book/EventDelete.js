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
import { getEvent, deleteEvent } from '../../actions/events';

import {bookTexts} from './texts'

const texts = bookTexts.eventDelete;

class EventDelete extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  renderContent() {
    if (!this.props.event) {
      return texts.modal.msg;
    }
    return texts.modal.msgF(this.props.event.name);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteEvent(id)}
          className='ui negative button'
        >
          {texts.modal.deleteBtn}
        </button>
        <Link to='/' className='ui button'>
          {texts.modal.cancelBtn}
        </Link>
      </Fragment>
    );
  }

  render() {
    return (
      <Modal
        title={texts.modal.title}
        content={this.renderContent()}
        actions={this.renderActions()}
        error={this.props.error}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  event: state.events[ownProps.match.params.id],
  error: state.events.error,
});

export default connect(
  mapStateToProps,
  { getEvent, deleteEvent }
)(EventDelete);