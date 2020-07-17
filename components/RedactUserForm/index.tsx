import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, Form, InjectedFormProps, FieldArray, GenericFieldArray } from 'redux-form';
import InputField from 'components/InputField';
import { required, minLength, maxLength, checkPasswords } from 'redux/validators';
import Router from 'next/router';
import { FaReply } from 'react-icons/fa';
import { goBack } from 'Helpers';

const firstNameMinLength = minLength(4);
const firstNameMaxLength = maxLength(12);

const passwordMinLength = minLength(4);
const passwordMaxLength = maxLength(10);

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

interface IRedactUserFormProps extends InjectedFormProps<{}, {}, string> {
  data: any;
  className: string;
}
class RedactUserForm extends Component<IRedactUserFormProps> {

  render() {
    const { handleSubmit, pristine, reset, submitting, className } = this.props;
    const element = this.props;
    // console.log('props of redact form =========>>>>> ', element);
    const isRedact = element.data && element.data.get("id");
    // console.log('IS REDACT ==>> ', element.data && element.data.get('id') );
    
    return (
      <Form className={className + ' rounded-lg flex flex-col items-center bg-white'} onSubmit={handleSubmit}>
        <div className='w-full flex flex-row items-center justify-between'>
          <h1 className={'m-4 text-center text-2xl font-medium text-teal-500 hover:text-teal-700 hover:font-black'}>{isRedact ? 'Redact' : 'Add'}</h1>
          <button type='button' onClick={() => goBack()}
          className='mx-4 px-4 py-2 rounded flex flex-row items-center font-semibold text-black bg-transparent border border-solid border-ocean-900 
          hover:text-white hover:bg-black hover:opacity-75 hover:border-transparent focus:outline-none'>
              <FaReply className='mr-2' />
              Back
          </button>
        </div>
        
        <div className='w-full px-4'>
          <Field
            name="firstName"
            component={InputField}
            type="text"
            label="First Name"
            validate={[required]} />
            
            <Field
            name="lastName"
            component={InputField}
            type="text"
            label="First Name"
            validate={[required]} />

            <div className='w-full mb-6 flex justify-start'>
              <Field className='focus:outline-none'
              name="role" component='select'>
                <option className='focus:outline-none' value="ADMIN">Admin</option>
                <option className='focus:outline-none' value="USER">User</option>
              </Field>
            </div>
            
            <Field
            name="email"
            component={InputField}
            type="text"
            label="Email"
            validate={[required]} />

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
        </div>
        
            
            

            

        <div className={'w-full flex flex-row justify-around my-10'}>
          <button type="submit" disabled={submitting}
            className='w-1/4 my-2 mx-3 py-3 px-6 bg-purple-700 hover:bg-purple-800 
            hover:cursor-pointer text-sm text-white font-bold rounded-lg py-3 
            focus:outline-none focus:bg-purple-800'>
            {isRedact ? 'Redact' : 'Add New'}
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}
            className='w-1/4 my-2 mx-3 py-3 px-6 bg-white hover:bg-purple-700 
            hover:cursor-pointer hover:text-white text-sm text-purple-700 
            font-bold rounded-lg py-3 focus:outline-none focus:bg-purple-800'>
            Reset
          </button>
        </div>
      </Form>
    )
  }
}

const reduxFormRedactUser = reduxForm({
  form: 'redactUserForm',
  // @ts-ignore
})(RedactUserForm);

const mapStateToProps = (state: any, props: any) => {
  console.log('state redact drean form => ', props);
  let data = null;
  if(props.data && props.data.size > 0){
    data = props.data.toJS();
    delete data.password;
  }
  
  console.log('data - ', data);
  return ({
    initialValues: data,
  })
}
const mapDispatchToProps = (dispatch) => ({

})

const connectRedactUser = connect(mapStateToProps, mapDispatchToProps)(reduxFormRedactUser);

export default connectRedactUser;

