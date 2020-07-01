import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, Form, FormErrors } from 'redux-form';
import { required, minLength, maxLength, correctEmail, checkPasswords, asyncValidate } from '../redux/validators/';
import InputField from './InputField';
import { connect } from 'react-redux';

const firstNameMinLength = minLength(4);
const firstNameMaxLength = maxLength(12);

const passwordMinLength = minLength(4);
const passwordMaxLength = maxLength(10);

class RegistrationForm extends Component<InjectedFormProps<{}, {}, string>> {

    render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;
        
        return (

            <Form className={'bg-pink-200 w-10/12 m-auto p-auto items-center'} onSubmit={handleSubmit}>
                <div className='flex-col mx-auto justify-start items-center py-2 text-xl'>
                    <h1 className={'mb-6 text-center uppercase text-5xl'}>Registration</h1>
                    
                    <Field
                        id='timezone' name='timezone'
                        type='hidden'
                        component={InputField}
                    />

                    <Field
                        className='align-middle w-full'
                        id="firstName" name="firstName"
                        component={InputField} type="text"
                        validate={[required, firstNameMinLength, firstNameMaxLength]}
                        placeholder='First Name'
                    />

                    <Field
                        className='align-middle w-full'
                        id="lastName" name="lastName"
                        component={InputField} type="text"
                        validate={[required, firstNameMinLength, firstNameMaxLength]}
                        placeholder='Last Name'
                    />

                    <Field
                        className='align-middle w-full'
                        id="email" name="email"
                        component={InputField} type="email"
                        validate={[required, correctEmail]}
                        placeholder='Email'
                    />

                    <div className={'mt-24'}>
                        <Field
                            id="password" name="password"
                            component={InputField} type="password"
                            validate={[required, passwordMinLength, passwordMaxLength]}
                            placeholder="Password"
                        />
                        <Field
                            id="confirmPassword" name="confirmPassword"
                            component={InputField} type="password"
                            validate={[required, passwordMinLength, passwordMaxLength, checkPasswords]}
                            placeholder="Confirm Password:"
                        />
                    </div>

                    {error && <strong>{error}</strong>}

                    <div className={'flex flex-rol justify-around my-20'}>
                        <button type="submit" disabled={submitting}
                                className='w-1/3 mx-auto text-black hover: cursor-pointer hover: text-green-700 text-xl'>
                            Registration
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


const reduxFormRedactDrean = reduxForm({
    form: 'registration',
    asyncValidate,
    asyncChangeFields: ['email']
  })(RegistrationForm);
  
  const mapStateToProps = (state: any, props: any) => {
    console.log('state redact drean form => ', state);
    
    const obj = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    return ({
        initialValues: obj
    })
  }
  const mapDispatchToProps = (dispatch) => ({
  
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(reduxFormRedactDrean);



