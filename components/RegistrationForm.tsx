import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, Form, FormErrors } from 'redux-form';
import { required, minLength, maxLength, correctEmail, checkPasswords } from '../redux/validators/';
import InputField from './InputField';

const firstNameMinLength = minLength(4);
const firstNameMaxLength = maxLength(8);

const passwordMinLength = minLength(4);
const passwordMaxLength = maxLength(10);


class RegistrationForm extends Component<InjectedFormProps<{}, {}, string>> {

    render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;
        return (

            <Form onSubmit={handleSubmit}>
                <h1>Registration</h1>

                {/* <div>
                    <label htmlFor="timezone">TimeZone</label>
                    <Field 
                    type="hidden"
                    name='timezone'
                    value={ Intl.DateTimeFormat().resolvedOptions().timeZone }
                />
                </div> */}


                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <Field
                        id="firstName" name="firstName"
                        component={InputField} type="text"
                        validate={[required, firstNameMinLength, firstNameMaxLength]}
                        placeholder="First Name "
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <Field
                        id="lastName" name="lastName"
                        component={InputField} type="text"
                        validate={[required, firstNameMinLength, firstNameMaxLength]}
                        placeholder="Last Name "
                    />
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <Field
                        id="email" name="email"
                        component={InputField} type="email"
                        validate={[required, correctEmail]}
                        placeholder="Email"
                    />
                </div>

                <br /> <br /> <br />
                <div>
                    <label htmlFor="password">Password: </label>
                    <Field
                        id="password" name="password"
                        component={InputField} type="password"
                        validate={[required, passwordMinLength, passwordMaxLength]}
                        placeholder="Password"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <Field
                        id="confirmPassword" name="confirmPassword"
                        component={InputField} type="password"
                        validate={[required, passwordMinLength, passwordMaxLength, checkPasswords]}
                        placeholder="Confirm Password:"
                    />
                </div>
                <br /> <br /> <br />

                {error && <strong>{error}</strong>}

                <div>
                    <button type="submit" disabled={submitting}>
                        Registration
                    </button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Reset
                    </button>
                </div>
            </Form>
        )
    }
}

export default reduxForm({
    form: 'registration',
})(RegistrationForm)



