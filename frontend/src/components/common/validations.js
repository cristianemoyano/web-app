export const required = value => (value ? undefined : 'Required');

export const minLength = min => value =>
    value && value.length < min ?
    `Must be at least ${min} characters` :
    undefined;

export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;


export const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Passwords do not match' : undefined;
