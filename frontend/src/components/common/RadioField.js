const RadioField = props => {
    const {
        meta: { submitting, error, touched },
        input: { onBlur, value, ...inputProps },
        slots,
        ...others
    } = props;
    const onChange = date => {
        Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
    };
    return (
        <div className={`field ${touched && error ? 'error' : ''}`}>
      <RadioGroup
              style={{ marginTop: 15,
                       marginLeft: 15
                     }}
              name="appointmentTimes"
              defaultSelected={0}
              onChange={onChange}
          >
          {slots.map(slot => (
          <FormControlLabel value={slot.value} {...slot} control={<Radio />} label={slot.label} />
          ))}
          </RadioGroup>
      </div>
    )
}
