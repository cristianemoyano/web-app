import React from "react";
import { KeyboardTimePicker } from '@material-ui/pickers';

export const TimeField = props => {
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
        <KeyboardTimePicker
          {...inputProps}
          {...others}
          value={value ? new Date(value) : new Date()}
          disabled={submitting}
          onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
          error={error && touched}
          onChange={onChange}
          ampm={false}
          format="h:mm a"
          mask="__:__ _M"
          placeholder="08:00 AM"
        />
      {touched && error && (
          <span className='ui pointing red basic label'>{error}</span>
        )}
    </div>
    );
};
