import React, { Component } from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Message from '../common/Message'
import moment from "moment";

import {DateField} from '../common/DateField'
import {TimeField} from '../common/TimeField'
import {TextField} from '../common/TextField'
import {required} from '../common/validations'

import {bookTexts} from './texts'

const texts = bookTexts.calendarForm;

class CalendarForm extends Component {

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    const {
        events: { error },
        pristine,
        submitting
    } = this.props;

    const btnText = `${this.props.initialValues ? texts.saveBtn : texts.saveBtn}`;

    let maxDate = moment().add(14, 'days');  

    return (
      <div className='ui segment'>
        {error && (
            <div>
              <Message title='Ops!' message={error.data} type='negative'/>
            </div>
        )}
        <form
          onSubmit={this.props.handleSubmit.bind(this.onSubmit)}
          className='ui form error'
        >
          <Field
            name='name'
            component={TextField}
            validate={[ required ]}
            placeholder={texts.fields.name} 
        />
        <div class="two fields">
          <Field
            name='date'
            component={DateField}
            maxDate={maxDate}
            label={texts.fields.date}
            inputVariant='outlined'
            />
          <Field
            name='time'
            component={TimeField}
            label={texts.fields.time}
            inputVariant='outlined'
        />
        </div>
        <Field
            name='description'
            component={TextField}
            placeholder={texts.fields.description}
        />
          <button className='ui primary button' disabled={pristine || submitting}>{btnText}</button>
        </form>
      </div>
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

const mapStateToProps = state => ({
    events: state.events
});

CalendarForm = connect(
    mapStateToProps,
)(CalendarForm);

export default reduxForm({
  form: 'calendarForm',
  touchOnBlur: false,
  validate
})(CalendarForm);