import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({ recaptchaSiteKey, input, label, type, meta: { touched, error } }) => {

	const onChange = (response) => input.onChange(response);

	return (
	    <div className={`field ${touched && error ? 'error' : ''}`}>
	   		<label>{label}</label>
		    <ReCAPTCHA
		      sitekey={recaptchaSiteKey}
		      onChange={onChange}
		    />
		   	{touched && error && (
	          <span className='ui pointing red basic label'>{error}</span>
	        )}
	    </div>
	);
};

export default Captcha;
