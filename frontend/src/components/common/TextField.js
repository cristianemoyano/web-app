import React from "react";

export const TextField = ({ input, label, meta: { touched, error }, placeholder }) => {
    return (
        <div className={`field ${touched && error ? 'error' : ''}`}>
    <label>{label}</label>
    <input {...input} autoComplete='off' placeholder={placeholder} autofocus />
    {touched && error && (
      <span className='ui pointing red basic label'>{error}</span>
    )}
  </div>
    );
};
