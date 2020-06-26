import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, Form, InjectedFormProps, FieldArray, GenericFieldArray } from 'redux-form';
import InputField from 'components/InputField';
import { required } from 'redux/validators';
import DreanList from './DreanList';

const FieldArrayCustom = FieldArray as new () => GenericFieldArray<Field, any>;

interface IRedactDreanForm {
  // load: Function;
  // redactDreanId: string;
}
class RedactDreanForm extends Component<InjectedFormProps<{}, {}, string> & IRedactDreanForm> {

  render(){
    const { handleSubmit, load, pristine, reset, submitting } = this.props;
    return(
      <Form onSubmit={handleSubmit}>
      <div>
        <label>Code Name</label>
        <div>
          <Field
            name="codeName"
            component={InputField}
            type="text"
            placeholder="Code name"
            validate={[required]}
          />
        </div>
      </div>

      <div>
        <label>Description</label>
        <div>
          <Field 
            name="description"
            component="textarea"
            type="text"
            placeholder="description"
            validate={[required]}
          />
        </div>
      </div>

      <div>
        <label>Date of event</label>
        <div>
          <Field 
            name="dateOfEvent"
            component="input"
            type="date"
            validate={[required]}
          />
        </div>
      </div>
      
      <div>
        <h1>Guests</h1>
        <FieldArrayCustom name="guests" component={DreanList}/>
      </div>

      <div>
        <h1>Need Things</h1>
        <FieldArrayCustom name="needThings" component={DreanList}/>
      </div>
      
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </button>
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
  // console.log('filter => ', state.entity.get("dreans").filter(item => item.get("_id") === id).get(0).toJS())
  // console.log('toJS => ', state.entity.get("dreans").filter(item => item.get("_id") === id).toJS())

  // const drean = state.entity.get("dreans").filter(item => item.get("_id") === id).toJS();
  // console.log('drean +> ', drean)
  return ({
    initialValues: props.data && props.data.toJS(),
  })
}
const mapDispatchToProps = (dispatch) => ({

})

const connectRedactDrean = connect(mapStateToProps, mapDispatchToProps)(reduxFormRedactDrean);

export default  connectRedactDrean;

