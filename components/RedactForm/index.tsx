import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, Form, InjectedFormProps, FieldArray, GenericFieldArray } from 'redux-form';
import InputField from 'components/InputField';
import { required } from 'redux/validators';
import DreanList from './DreanList';

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

interface IRedactDreanFormProps extends InjectedFormProps<{}, {}, string> {
  data: any;
  className: string;
  hrefValue: string;
  asValue: string;
}
class RedactDreanForm extends Component<IRedactDreanFormProps> {

  render() {
    const { handleSubmit, hrefValue, asValue, pristine, reset, submitting, className } = this.props;
    console.log('props of redact form =========>>>>> ', this.props.data);
    const isRedact = this.props.data && this.props.data._id !== 'add';
    return (
      <Form className={className + ' flex flex-col items-center bg-white'} onSubmit={handleSubmit}>
        <div>
          <h1 className={'my-4 text-center text-2xl uppercase font-medium text-gray-500'}>{isRedact ? 'Redact' : 'Add'}</h1>
          {/* <Link href={hrefValue} as={asValue}>
            <button className={'my-2 bg-transparent hover:bg-red-300 ' +
              ' text-red-600 font-semibold hover:text-white py-2 px-4 ' +
              ' border border-red-800 hover:border-transparent rounded'}>
                back
            </button>
          </Link> */}
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
              validate={[]}
              label={'Date of event'} />
          </div>
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

  getCurrentState = () => {
    console.log("current state => ", this.props)
  }
}

const reduxFormRedactDrean = reduxForm({
  form: 'redactDreanForm',

  // @ts-ignore
})(RedactDreanForm);

const mapStateToProps = (state: any, props: any) => {
  console.log('state redact drean form => ', props);
  return ({
    initialValues: props.data && props.data.size > 0 && props.data.toJS(),
  })
}
const mapDispatchToProps = (dispatch) => ({
})

const connectRedactDrean = connect(mapStateToProps, mapDispatchToProps)(reduxFormRedactDrean);

export default connectRedactDrean;

