import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, Form, InjectedFormProps, FieldArray, GenericFieldArray } from 'redux-form';
import InputField from 'components/InputField';
import { required } from 'redux/validators';
import DreanList from './DreanList';
import Router from 'next/router';
import { FaArrowCircleLeft, FaReply } from 'react-icons/fa';
import { goBack } from 'Helpers';

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

interface IRedactDreanFormProps extends InjectedFormProps<{}, {}, string> {
  data: any;
  className: string;
}
class RedactDreanForm extends Component<IRedactDreanFormProps> {

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
        
        <div className='w-full flex flex-row justify-around'>
          <div className='w-3/6'>
            <Field
              name="codeName"
              component={InputField}
              type="text"
              label="Code name"
              validate={[required]} />
          </div>
          <div className='w-2/6'>
            <Field
              name="dateOfEvent"
              component={InputField}
              type="date"
              validate={[required]}
              label={'Date of event'} />
          </div>
        </div>

        <div className='w-11/12'>
          <Field className='focus:outline-none'
          name="publicAccess" component='select'>
            <option className='focus:outline-none' value="PRIVATE">Private</option>
            <option className='focus:outline-none' value="PUBLIC">Public</option>
          </Field>
        </div>

        <div className='w-11/12'>
          <Field
          name="description"
          component={InputField}
          type="textarea"
          label="Description"
          validate={[required]}/>
        </div>

        <div className={'w-11/12 flex flex-row'}>
          <div className={'w-1/2'}>
            <FieldArrayCustom name="guests"  listName='Guests' component={DreanList} />
          </div>

          <div className={'w-1/2'}>
            <FieldArrayCustom name="needThings" listName='Need Things' component={DreanList} />
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

const reduxFormRedactDrean = reduxForm({
  form: 'redactDreanForm',
  // @ts-ignore
})(RedactDreanForm);

const mapStateToProps = (state: any, props: any) => {
  console.log('state redact drean form => ', props);
  let data = null;
  if(props.data && props.data.size > 0){
    data = props.data.toJS()
  }
  console.log('data - ', data);
  return ({
    initialValues: data ,
  })
}
const mapDispatchToProps = (dispatch) => ({

})

const connectRedactDrean = connect(mapStateToProps, mapDispatchToProps)(reduxFormRedactDrean);

export default connectRedactDrean;

