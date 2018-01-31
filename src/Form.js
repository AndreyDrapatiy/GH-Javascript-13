import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './style.css'



const renderDatePicker = ({input, placeholder, defaultValue, label, meta: {touched, error} }) => (
    <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
);

const required = value => (value ? undefined : 'Required');


const minlength = min => value =>
    value && value.length < min ? `Must be less` : undefined;

const  nameMinLength = minlength(5);




const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning }
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
            ((error && <span className="error">{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
);






const Form = props => {

    const { handleSubmit, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit} className='form'>
            <div>
                <label>Name (5 symbols min)</label>
                <div>
                    <Field
                        name="Name"
                        component={renderField}
                        type="text"
                        validate={[required, nameMinLength]}
                    />
                </div>
            </div>
            <div>
                <label>Email</label>
                <div>
                    <Field
                        name="email"
                        component={renderField}
                        type="email"
                        validate={required}
                    />
                </div>
            </div>
            <div>
                <label>Phone</label>
                <div>
                    <Field
                        name="phone"
                        component={renderField}
                        type="text"
                        validate={required}
                    />
                </div>
            </div>
            <div>
                <label>Address</label>
                <div>
                    <Field
                        name="address"
                        component="input"
                        type="address"
                    />
                </div>
            </div>
            <div>
                <label>Post code</label>
                <div>
                    <Field
                        name="post code"
                        component="input"
                        type="Post code"
                    />
                </div>
            </div>
            <div>
                <label>Birth date</label>
                <div>
                    <Field
                        name="Birth date"
                        component={renderDatePicker}
                        type="date"
                    />
                </div>
            </div>
            <div>
                <button type="submit" className='submit-input' disabled={pristine || submitting}>Submit</button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'form',
})(Form);
