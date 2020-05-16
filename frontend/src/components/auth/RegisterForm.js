/*
The registration form is almost the same as the login form, but we use Field-Level Validation in this form.
*/
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../actions/auth';
import Message from '../common/Message'
import {minLength, maxLength, required, passwordsMatch} from '../common/validations'
import Captcha from '../common/Captcha'

const minLength3 = minLength(3);
const maxLength15 = maxLength(15);

class RegisterForm extends Component {
    renderField = ({ input, label, type, meta: { touched, error } }) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>
        <label>{label}</label>
        <input {...input} type={type} />
        {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
      </div>
        );
    };

    onSubmit = formValues => {
        this.props.register(formValues);
    };

    render() {

        const {
            auth: { error },
            submitting,
            pristine,
            submitFailed,
        } = this.props;


        if (this.props.isAuthenticated) {
            return <Redirect to='/' />;
        }
        return (
            <div className='ui container'>
                <div className='ui segment'>

                    {error && submitFailed && (
                      <div>
                        <Message title='Ops!' message={error.data} type='negative'/>
                      </div>
                    )}
                  <form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                    className='ui form'
                  >
                    <Field
                      name='username'
                      type='text'
                      component={this.renderField}
                      label='Username'
                      validate={[required, minLength3, maxLength15]}
                    />
                    <Field
                      name='email'
                      type='email'
                      component={this.renderField}
                      label='Email'
                      validate={required}
                    />
                    <Field
                      name='password'
                      type='password'
                      component={this.renderField}
                      label='Password'
                      validate={required}
                    />
                    <Field
                      name='password2'
                      type='password'
                      component={this.renderField}
                      label='Confirm Password'
                      validate={[required, passwordsMatch]}
                    />
                    <Field
                      name='captcharesponse'
                      component={Captcha}
                      validate={[required]}
                    />
                    <button className='ui primary button' disabled={pristine || submitting}>Register</button>
                  </form>
                  <p style={{ marginTop: '1rem' }}>
                    Already have an account? <Link to='/login'>Login</Link>
                  </p>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

RegisterForm = connect(
    mapStateToProps, { register }
)(RegisterForm);

export default reduxForm({
    form: 'registerForm',
    fields: ['username', 'email', 'password', 'password2','captcharesponse'],
})(RegisterForm);