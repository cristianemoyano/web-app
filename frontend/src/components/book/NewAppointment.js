import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppointmentSave from './AppointmentSave';
import Head from '../layout/Head'


class NewAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
        };
    }
  render() {
    return (
      <div className='ui'>
      	<Head title="Agendar un turno"/>
        <AppointmentSave />
      </div>
    );
  }
}

export default connect(
  null,
)(NewAppointment);