/*
If the username and password do not match the information in the database,
Django returns Non-field errors. To render this error, we need to have a field named 'non_field_errors'.
*/

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../actions/auth';
import { getSecrets } from '../../actions/secrets';
import Message from '../common/Message'
import Captcha from '../common/Captcha'
import {PUBLIC_RSA_KEY} from '../common/constants'
import {required} from '../common/validations'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

class LoginForm extends Component {
    
  componentDidMount() {
    this.props.getSecrets();
  }

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

  hiddenField = ({ type, meta: { error } }) => {
    return (
      <div className='field'>
        <input type={type} />
        {error && <div className='ui red message'>{error}</div>}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.login(formValues);
  };

  render() {

    const {
        auth: { error },
        submitting,
        pristine,
        submitFailed,
        secrets,
    } = this.props;

    let secretPayload = {
        'recaptcha_site_key': 'null',
    }

    if (!_.isEmpty(secrets)) {
        secretPayload = jwt.verify(secrets.token, PUBLIC_RSA_KEY);
    }
   

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
              validate={[required]}
            />
            <Field
              name='password'
              type='password'
              component={this.renderField}
              label='Password'
              validate={[required]}
            />
            <Field
              name='captcharesponse'
              component={Captcha}
              validate={[required]}
              recaptchaSiteKey={secretPayload.recaptcha_site_key}
            />
            <Field
              name='non_field_errors'
              type='hidden'
              component={this.hiddenField}
            />
            <button className='ui primary button' disabled={pristine || submitting}>Login</button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  secrets: state.secrets
});

LoginForm = connect(
  mapStateToProps,
  { login, getSecrets }
)(LoginForm);

export default reduxForm({
  form: 'loginForm',
  fields: ['username', 'password', 'captcharesponse'],
})(LoginForm);
