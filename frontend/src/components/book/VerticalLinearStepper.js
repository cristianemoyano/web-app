import React, { Fragment } from "react";
import { submit } from 'redux-form'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { Field } from 'redux-form';

import moment from "moment";
import _ from 'lodash'

import {DateField} from '../common/DateField'
import {TimeField} from '../common/TimeField'
import {TextField} from '../common/TextField'
import {required} from '../common/validations'

import {bookTexts} from './texts'

const texts = bookTexts.verticalLinearStepper;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return [
        texts.steps.s1,
        texts.steps.s2,
        texts.steps.s3,
    ];
}

function getStepContent(step, slots) {

    let maxDate = moment().add(14, 'days');
    switch (step) {
        case 0:
            return (
                <Field
                    name='date'
                    component={DateField}
                    maxDate={maxDate}
                    label={texts.fields.date}
                    inputVariant='outlined'
                />
            );
        case 1:
            return (
                <Fragment>
                    <Field
                      name='time'
                      component={TimeField}
                      label={texts.fields.time}
                      inputVariant='outlined'
                    />
                </Fragment>
            );
        case 2:
            return (
                <Fragment>
                   <Field
                        name='name'
                        component={TextField}
                        validate={[ required ]}
                        placeholder={texts.fields.name}
                    />
                    <Field
                        name='description'
                        component={TextField}
                        placeholder={texts.fields.description}
                    />
                </Fragment>
            );
        default:
            return 'Unknown step';
    }
}

export default function VerticalLinearStepper({
    slots,
    pristine,
    submitting,
    btnText,
    dispatch,
    error
}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handleSubmit = () => {
        dispatch(submit('calendarForm'));
        handleComplete();
    };

    const renderNext = () => {

        if (activeStep === steps.length - 1) {
            return (
                <Fragment>
                    <Button
                        className={classes.button}
                        onClick={handleReset}
                    >
                        {texts.buttons.reset}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={pristine || submitting}
                        onClick={handleSubmit}
                    >
                        {btnText}
                    </Button>
                </Fragment>
            );
        } else {
            return (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                    {texts.buttons.next}
                </Button>
            );
        }
    };

    return (
        <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          linear={false}
          orientation="vertical"
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
              <Button onClick={() => setActiveStep(index)}>
                    {label}
              </Button> 
              </StepLabel>
              <StepContent>
                <Typography>{getStepContent(index, slots)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      {texts.buttons.back}
                    </Button>

                    {renderNext()}
                    
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
            {_.isEmpty(error) ? texts.success : texts.error}
            </Typography>
            <Button
                onClick={handleReset}
                variant="contained"
                color="primary"
                className={classes.button}
            >
                {texts.buttons.new}
            </Button>
          </div>
        ) : (
          <br/>
        )}
      </div>
    </div>
    );
}
