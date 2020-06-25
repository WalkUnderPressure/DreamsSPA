import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, Form } from 'redux-form';
import { required, minLength, maxLength, correctEmail } from '../redux/validators/';
import InputField from './InputField';

const passwordMinLength = minLength(4);
const passwordMaxLength = maxLength(8);

class LoginForm extends Component<InjectedFormProps<{}, {}, string>> {

    render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="email">Email: </label>
                    <Field
                        id="email" name="email"
                        component={InputField} type="email"
                        validate={[required, correctEmail]}
                        placeholder='Email'
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <Field
                        id="password" name="password"
                        component={InputField} type="password"
                        validate={[required, passwordMinLength, passwordMaxLength]}
                        placeholder='Password'
                    />
                </div>
                {error && <strong>{error}</strong>}
                <div>
                    <button type="submit" disabled={submitting}>
                        Log In
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
    form: 'login',
})(LoginForm)
