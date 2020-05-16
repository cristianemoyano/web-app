import React from "react";
import { KeyboardDatePicker } from '@material-ui/pickers';

export const DateField = props => {
    const {
        meta: { submitting, error, touched },
        input: { onBlur, value, ...inputProps },
        ...others
    } = props;

    const onChange = date => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
    };

    return (
        <div className={`field ${touched && error ? 'error' : ''}`}>
        <KeyboardDatePicker
          {...inputProps}
          {...others}
          autoOk
          value={value ? new Date(value) : new Date()}
          disabled={submitting}
          onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
          error={error && touched}
          onChange={onChange}
          placeholder="10/10/2018"
          format="L"
          minDate={new Date()}
        />
      {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
    </div>
    );
};
