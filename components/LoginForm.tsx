import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, Form } from 'redux-form';
import { required, minLength, maxLength, correctEmail } from '../redux/validators/';
import InputField from './InputField';
import Link from 'next/link';

const passwordMinLength = minLength(4);
const passwordMaxLength = maxLength(10);

interface ILoginFormProps extends InjectedFormProps<{}, {}, string> {
    className: string;
    changeForm: (event: any) => void;
}

class LoginForm extends Component<ILoginFormProps> {

    render() {
        const { className, error, handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Form className={className + ' mx-6 py-2 text-xl flex flex-col items-center bg-white'} onSubmit={handleSubmit}>
                <div className={'text-center pb-8 text-lg'} >
                    <h1 className='font-extrabold text-3xl'>Sign In</h1>
                    <span className={'text-gray-500 font-bold'} >
                        Or
                        {/* <Link href="/registration" as="/registration"> */}
                            <a onClick={this.props.changeForm}
                                className={"ml-2 text-purple-600 font-bold cursor-pointer"}>
                                Create An Account
                            </a>
                        {/* </Link> */}
                    </span>
                </div>

                <Field
                    className='w-full'
                    id="email" name="email"
                    component={InputField} type="email"
                    validate={[required, correctEmail]}
                    label='Email'
                />
                <Field
                    className='w-full'
                    id="password" name="password"
                    component={InputField} type="password"
                    validate={[required, passwordMinLength, passwordMaxLength]}
                    label='Password'
                />
                {error && <strong>{error}</strong>}
                <button type="submit" disabled={submitting}
                    className='w-1/3 bg-gray-900 hover:bg-gray-800 hover:cursor-pointer text-sm text-white font-bold rounded-lg py-3 focus:outline-none focus:bg-gray-800'>
                    Sign In
                </button>
            </Form>
        )
    }
}

export default reduxForm({
    form: 'login',
    //@ts-ignore
})(LoginForm)
