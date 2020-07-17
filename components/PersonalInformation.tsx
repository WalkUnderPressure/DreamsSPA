import React, { Component } from 'react';
import { Field, reduxForm, InjectedFormProps, Form, FormErrors } from 'redux-form';
import { required, minLength, maxLength, correctEmail, checkPasswords, asyncValidate } from '../redux/validators';
import InputField from './InputField';
import { connect } from 'react-redux';
import Link from 'next/link';
import { goBack } from 'Helpers';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

const firstNameMinLength = minLength(4);
const firstNameMaxLength = maxLength(12);

const passwordMinLength = minLength(4);
const passwordMaxLength = maxLength(10);

interface IPersonalInformationProps extends InjectedFormProps<{}, {}, string> {
    className: string;
    user: any;
}

class PersonalInformation extends Component<IPersonalInformationProps> {

    render() {
        const { user, className, error, handleSubmit, pristine, reset, submitting } = this.props;

        console.log('user - ', user);

        return (
            <Form className={className + ' w-full bg-white rounded-lg'} onSubmit={handleSubmit}>
                <div className='p-4 flex flex-row justify-between'>
                    <div>
                        <h1 className='text-lg text-black font-semibold'>
                            Personal Information
                        </h1>
                        <p className='text-sm text-ocean-900 font-medium'>
                            Update your personal information
                        </p>
                    </div>
                    <div className='flex flex-row items-center '>
                        <button type="submit" disabled={submitting}
                            className='py-2 px-4 bg-blue-400 text-white font-hairline rounded-lg hover:bg-blue-500 focus:outline-none'>
                            Save Changes
                        </button>
                        <button type='button' onClick={() => goBack()}
                            className='mx-2 py-2 px-4 bg-gray-300 font-hairline rounded-lg hover:bg-gray-400 focus:outline-none'>
                            Cancel
                        </button>
                    </div>
                </div>

                <div className='w-full border-solid border-teal-300 border' />

                <div className='p-4'>
                    <h1 className='w-full text-center text-black text-lg font-medium'>User Info</h1>

                    <div className='flex flex-row justify-center'>
                        <p className='mt-6 font-light text-black text-base'>Avatar</p>
                        
                        <div className='flex flex-col justify-center '>
                            <div className='p-3 w-32 h-32 relative rounded-lg bg-opacity-50 bg-teal-400'>
                                {/* transform duration-1000 hover:scale-200 */}
                                <div className='w-full h-full bg-blue-400 rounded-lg border-solid border-white border-2 
                                shadow-2xl text-center'>IMG</div>
                                <button type='button' title='Change Avatar'
                                    className='absolute top-0 right-0 rounded-full p-1 w-6 h-6 bg-ocean-500 
                                    flex justify-center items-center hover:bg-ocean-900 focus:outline-none shadow-2xl'>
                                    <FaPencilAlt className='text-black text-md' />
                                </button>
                                <button type='button' title='Remove Avatar'
                                    className='absolute bottom-0 right-0 rounded-full p-1 w-6 h-6 bg-ocean-500 
                                    flex justify-center items-center hover:bg-ocean-900 focus:outline-none shadow-2xl'>
                                    <FaTimes />
                                </button>
                            </div>
                            <p className='pl-4 text-xs text-ocean-900 font-medium'>
                                Allowed file types: png, jpg, jpeg.
                            </p>
                        </div>
                    </div>

                    <Field
                        id='timezone' name='timezone'
                        type='hidden'
                        component='input'/>

                    <Field
                        className='w-full'
                        id="firstName" name="firstName"
                        component={InputField} type="text"
                        validate={[firstNameMinLength, firstNameMaxLength]}
                        label='First Name'/>

                    <Field
                        className='w-full'
                        id="lastName" name="lastName"
                        component={InputField} type="text"
                        validate={[firstNameMinLength, firstNameMaxLength]}
                        label='Last Name'/>

                    <div>
                        <Field
                            id="password" name="password"
                            component={InputField} type="password"
                            validate={[passwordMinLength, passwordMaxLength]}
                            label="Password" />
                        <Field
                            id="confirmPassword" name="confirmPassword"
                            component={InputField} type="password"
                            validate={[passwordMinLength, passwordMaxLength, checkPasswords]}
                            label="Confirm Password:" />
                    </div>
                    {error && <strong>{error}</strong>}
                </div>


                {/* 
                    
                    <Field
                        className='w-full'
                        id="email" name="email"
                        component={InputField} type="email"
                        validate={[required, correctEmail]}
                        label='Email'
                    />
                */}
            </Form>
        )
    }
}


const reduxFormRedactDrean = reduxForm({
    form: 'profile',
    // asyncValidate,
    // asyncChangeFields: ['email']
    //@ts-ignore
})(PersonalInformation);

const mapStateToProps = (state: any, props: any) => {
    console.log('state redact drean form => ', props);
    let data = null;
    if(props.user && props.user.size > 0){
        data = props.user.toJS();
        data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    console.log('data - ', data);
    return ({
        initialValues: data ,
    })
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(reduxFormRedactDrean);



