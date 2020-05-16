import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/events';
import StepperAppointment from './StepperAppointment';

class AppointmentSave extends Component {
  onSubmit = formValues => {
    this.props.addEvent(formValues);
  };

  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <StepperAppointment
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
)(AppointmentSave);
