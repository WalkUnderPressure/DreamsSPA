import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, Form, InjectedFormProps, FieldArray, GenericFieldArray } from 'redux-form';
import InputField from 'components/InputField';
import { required } from 'redux/validators';
import DreanList from './DreanList';

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

interface IRedactDreanForm {

}
class RedactDreanForm extends Component<InjectedFormProps<{}, {}, string> & IRedactDreanForm> {

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return(
      <Form className={'bg-pink-200 w-10/12 m-auto p-auto items-center'} onSubmit={handleSubmit}>
        <div className='flex-col mx-auto justify-start items-center py-2 text-xl'>
          <h1 className={'mb-6 text-center uppercase text-5xl'}>Redact or Add</h1>
          <Field
            name="codeName"
            component={InputField}
            type="text"
            placeholder="Code name"
            validate={[required]}
          />


          <Field 
            name="description"
            component={InputField}
            type="text"
            placeholder="Description"
            validate={[required]}
          />

          <Field
              name="dateOfEvent"
              component={InputField}
              type="date"
              validate={[required]}
              placeholder={'Date of event'}
          />

          <div className={'mx-auto flex flex-row w-11/12 '}>
            <div className={'w-1/2'}>
              <h1 className={'mb-6 text-center uppercase text-3xl'}>Guests</h1>
              <FieldArrayCustom name="guests" component={DreanList}/>
            </div>

            <div className={'w-1/2'}>
              <h1 className={'mb-6 text-center uppercase text-3xl'}>Need Things</h1>
              <FieldArrayCustom name="needThings" component={DreanList}/>
            </div>
          </div>


          <div className={'flex flex-rol justify-around my-20'}>
            <button type="submit" disabled={submitting}
                    className='w-1/3 mx-auto text-black hover: cursor-pointer hover: text-green-700 text-xl'>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}
                    className='w-1/3 mx-auto text-black hover: cursor-pointer hover: text-green-700 text-xl'>
              Undo Changes
            </button>
          </div>
        </div>
    </Form>
    )
  }
}

const reduxFormRedactDrean = reduxForm({
  form: 'redactDreanForm',
})(RedactDreanForm);

const mapStateToProps = (state: any, props: any) => {
  console.log('state redact drean form => ', props);
  return ({
    initialValues: props.data && props.data.toJS(),
  })
}
const mapDispatchToProps = (dispatch) => ({

})

const connectRedactDrean = connect(mapStateToProps, mapDispatchToProps)(reduxFormRedactDrean);

export default  connectRedactDrean;

