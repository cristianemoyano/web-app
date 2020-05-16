import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, editEvent } from '../../actions/events';
import CalendarForm from './CalendarForm';

class EventEdit extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editEvent(this.props.match.params.id, formValues);
  };

  render() {
    return (
      <div className='ui container'>
        <h2 style={{ marginTop: '2rem' }}>Edit Event</h2>
        <CalendarForm
          initialValues={this.props.event}
          enableReinitialize={true}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  event: state.events[ownProps.match.params.id],
});

export default connect(
  mapStateToProps,
  { getEvent, editEvent }
)(EventEdit);