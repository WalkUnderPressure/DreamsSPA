import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, Form, FormErrors } from 'redux-form';
import { required, minLength, maxLength, correctEmail, checkPasswords, asyncValidate } from '../redux/validators/';
import InputField from './InputField';
import { connect } from 'react-redux';
import Link from 'next/link';

const firstNameMinLength = minLength(4);
const firstNameMaxLength = maxLength(12);

const passwordMinLength = minLength(4);
const passwordMaxLength = maxLength(10);

interface IRegistrationFormProps extends InjectedFormProps<{}, {}, string> {
    className: string;
}

class RegistrationForm extends Component<IRegistrationFormProps> {

    render() {
        const { className, error, handleSubmit, pristine, reset, submitting } = this.props;
        
        return (
            <Form className={className + ' mx-6 py-2 text-xl flex flex-col items-center bg-white'} onSubmit={handleSubmit}>
               <div className='text-center pb-8 text-lg' >
                    <h1 className='font-extrabold text-3xl'>Sign Up</h1>
                    <p className='text-xl text-ocean-700 font-medium'>
                        Enter your details to create your account
                    </p>
                </div>
                    
                    <Field
                        id='timezone' name='timezone'
                        type='hidden'
                        component='input'
                    />

                    <Field
                        className='w-full'
                        id="firstName" name="firstName"
                        component={InputField} type="text"
                        validate={[required, firstNameMinLength, firstNameMaxLength]}
                        label='First Name'
                    />

                    <Field
                        className='w-full'
                        id="lastName" name="lastName"
                        component={InputField} type="text"
                        validate={[required, firstNameMinLength, firstNameMaxLength]}
                        label='Last Name'
                    />

                    <Field
                        className='w-full'
                        id="email" name="email"
                        component={InputField} type="email"
                        validate={[required, correctEmail]}
                        label='Email'
                    />

                    <div className={'mt-12 w-full'}>
                        <Field
                            id="password" name="password"
                            component={InputField} type="password"
                            validate={[required, passwordMinLength, passwordMaxLength]}
                            label="Password"/>
                        <Field
                            id="confirmPassword" name="confirmPassword"
                            component={InputField} type="password"
                            validate={[required, passwordMinLength, passwordMaxLength, checkPasswords]}
                            label="Confirm Password:"/>
                    </div>

                    {error && <strong>{error}</strong>}

                    <div className={'w-full flex flex-row justify-center'}>
                        <button type="submit" disabled={submitting}
                                className='w-1/3 my-2 mx-3 py-3 px-6 bg-purple-700 hover:bg-purple-800 hover:cursor-pointer text-sm text-white font-bold rounded-lg py-3 focus:outline-none focus:bg-purple-800'>
                            Submit
                        </button>
                        <Link href="/auth/[id]" as='/auth/login'>
                            <button type="button" 
                                className='w-1/3 my-2 mx-3 py-3 px-6 bg-white hover:bg-purple-700 hover:cursor-pointer hover:text-white text-sm text-purple-700 font-bold rounded-lg py-3 focus:outline-none focus:bg-purple-800'>
                                Cancel
                            </button>
                        </Link>
                        
                    </div>
            </Form>
        )
    }
}


const reduxFormRedactDrean = reduxForm({
    form: 'registration',
    asyncValidate,
    asyncChangeFields: ['email']
    //@ts-ignore
  })(RegistrationForm);
  
  const mapStateToProps = (state: any, props: any) => {
    console.log('state redact drean form => ', state);
    
    const userTimeZone = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    return ({
        initialValues: userTimeZone
    })
  }
  const mapDispatchToProps = (dispatch) => ({
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(reduxFormRedactDrean);



