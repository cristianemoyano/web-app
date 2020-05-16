import React, { Component } from "react";

import { reduxForm, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react'

import VerticalLinearStepper from './VerticalLinearStepper'
import Message from '../common/Message'

import { addEvent } from '../../actions/events';
import moment from "moment";

import {bookTexts} from './texts'

const texts = bookTexts.stepperAppointment;


const getAppointmentSummary = (values) => {
    return (
        <span>
        Agendando un turno el día {
            values.date && 
            <b>
            {
                moment(values.date).format('dddd[,] MMMM Do')
            }
            </b>
        } 
        {
            values.time &&
            <span> a las <b>
            {
                moment(values.time).format('h:mm a')
            }</b>
            </span>
        }
        {
            values.name &&
            <span> para <b>
            {values.name}</b>
            </span>
        }
        </span>
    )
}


class StepperAppointment extends Component {

    onSubmit = formValues => {
        this.props.addEvent(formValues);
    };


    render() {
        const {
            events: { error },
            pristine,
            submitting,
            submitSucceeded,
            dispatch,
            values,
        } = this.props;

        const btnText = `${this.props.initialValues ? texts.saveBtn : texts.saveBtn}`;

        const slots = [{
                'value': '0',
                'label': '10:00 pm - 11:00 pm',
                'disabled': false
            },
            {
                'value': '1',
                'label': '12:00 pm - 1:00 pm',
                'disabled': false
            },
        ]

        return (
            <Segment>
                {error && (
                    <div>
                      <Message title='Ops!' message={error.data} type='negative'/>
                    </div>
                )}
                { getAppointmentSummary(values)}
                <form
                    onSubmit={this.props.handleSubmit.bind(this.onSubmit)}
                    className='ui form error'
                >
                    <VerticalLinearStepper
                        slots={slots}
                        pristine={pristine}
                        submitting={submitting}
                        submitSucceeded={submitSucceeded}
                        btnText={btnText}
                        dispatch={dispatch}
                        error={error}
                    />
                </form>
            </Segment>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.name) {
        errors.name = texts.validate.error;
    }

    return errors;
};


const selector = formValueSelector('calendarForm')
const mapStateToProps = state => ({
    events: state.events,
    values: selector(state, 'name', 'description', 'date', 'time'),
});

StepperAppointment = connect(
    mapStateToProps, { addEvent }
)(StepperAppointment);

export default reduxForm({
    form: 'calendarForm',
    touchOnBlur: false,
    validate
})(StepperAppointment);