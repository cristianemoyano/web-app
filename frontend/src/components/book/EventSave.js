import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/events';
import CalendarForm from './CalendarForm';

class EventSave extends Component {
  onSubmit = formValues => {
    this.props.addEvent(formValues);
  };

  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <CalendarForm
          destroyOnUnmount={false}
          onSubmit={this.onSubmit}
          initialValues={
            {
              'date': new Date(),
              'time': new Date(),
            }
          }
        />
      </div>
    );
  }
}

export default connect(
  null,
  { addEvent }
)(EventSave);
