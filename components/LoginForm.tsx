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
            <Form className='bg-pink-200 w-1/2 m-auto p-auto items-center' onSubmit={handleSubmit}>
                <div className='flex-col mx-auto justify-start items-center py-2 text-xl'>
                    <h1 className='mb-6 text-center uppercase text-5xl'>Login</h1>
                    <Field
                        className='align-middle w-full'
                        id="email" name="email"
                        component={InputField} type="email"
                        validate={[required, correctEmail]}
                        placeholder='Email'
                    />
                    <Field
                        className='align-middle w-full'
                        id="password" name="password"
                        component={InputField} type="password"
                        validate={[required, passwordMinLength, passwordMaxLength]}
                        placeholder='Password'
                    />
                    {error && <strong>{error}</strong>}
                    <div
                        className='flex flex-rol justify-around my-20'
                    >
                        <button type="submit" disabled={submitting}
                            className='w-1/3 mx-auto text-black hover: cursor-pointer hover: text-green-700 text-xl'>
                            Log In
                        </button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}
                            className='w-1/3 mx-auto text-black hover: cursor-pointer hover: text-green-700 text-xl'>
                            Reset
                        </button>
                    </div>
                </div>
            </Form>
        )
    }
}

export default reduxForm({
    form: 'login',
})(LoginForm)
