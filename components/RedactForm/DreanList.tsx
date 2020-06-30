import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, WrappedFieldArrayProps, InjectedFormProps, GenericFieldArray } from 'redux-form';
import { required } from 'redux/validators';
import InputField from 'components/InputField';

interface IDreanListProps {
  name: string;
}

class DreanList extends Component<WrappedFieldArrayProps<{}> & IDreanListProps>{

  render() {
    // console.log('drean list props => ', this.props);
    const { fields, name, meta: { error, submitFailed } } = this.props;
    return (
      <ul className={'w-10/12'}>
        <div className={'w-full flex flex-col'}>
          <button type="button" onClick={() => fields.push('')}
                  className={'my-auto bg-transparent hover:bg-green-400 ' +
            'text-red-600 font-semibold hover:text-white py-2 px-4 ' +
            'border border-red-800 hover:border-transparent rounded'}>
            Add Item
          </button>
          {submitFailed && error && <span>{error}</span>}
        </div>
        {fields && fields.map((member, index: number) => (
          <li className={'my-2 flex flex-row items-center'} key={index}>
            <div className={'w-full'}>
              <Field
                  name={`${member}`}
                  type="text"
                  component={InputField}
                  validate={[required]}
              />
            </div>
            <button type="button" title="Remove Item"
                    onClick={() => fields.remove(index)}
                    className={'bg-transparent hover:bg-red-700 ' +
                    'text-red-600 font-semibold hover:text-white py-2 px-4 ' +
                    'border border-red-800 hover:border-transparent rounded'}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default DreanList;


// const renderHobbies = (props: WrappedFieldArrayProps<undefined>) => {
//   const { fields } = props;
//   const { error } = props.meta;

//   return (
//     <ul>
//       <li>
//         <button type="button" onClick={() => fields.push(undefined)}>
//           Add Hobby
//         </button>
//       </li>
//       {fields.map((hobby, index) => (
//         <li key={index}>
//           <button
//             type="button"
//             title="Remove Hobby"
//             onClick={() => fields.remove(index)}
//           />
//           <Field
//             name={hobby}
//             type="text"
//             component={InputField}
//             label={`Hobby #${index + 1}`}
//           />
//         </li>
//       ))}
//       {error && <li className="error">{error}</li>}
//     </ul>
//   )
// }

// const renderMembers = (props: WrappedFieldArrayProps<{}>) => {
//   const { fields } = props;
//   const { error, submitFailed } = props.meta;

//   return (
//     <ul>
//       <li>
//         <button type="button" onClick={() => fields.push({})}>
//           Add Member
//         </button>
//         {submitFailed && error && <span>{error}</span>}
//       </li>
//       {fields.map((member, index) => (
//         <li key={index}>
//           <button
//             type="button"
//             title="Remove Member"
//             onClick={() => fields.remove(index)}
//           />
//           <h4>Member #{index + 1}</h4>
//           <Field
//             name={`${member}.firstName`}
//             type="text"
//             component={renderField}
//             label="First Name"
//           />
//           <Field
//             name={`${member}.lastName`}
//             type="text"
//             component={renderField}
//             label="Last Name"
//           />
//           <FieldArrayCustom name={`${member}.hobbies`} component={renderHobbies} />
//         </li>
//       ))}
//     </ul>
//   )
// }

// const FieldArraysForm = (props: InjectedFormProps) => {
//   const { handleSubmit, pristine, reset, submitting } = props

//   return (
//     <form onSubmit={handleSubmit}>
//       <Field
//         name="clubName"
//         type="text"
//         component={renderField}
//         label="Club Name"
//       />
//       <FieldArrayCustom name="members" component={renderMembers} />
//       <div>
//         <button type="submit" disabled={submitting}>
//           Submit
//         </button>
//         <button type="button" disabled={pristine || submitting} onClick={reset}>
//           Clear Values
//         </button>
//       </div>
//     </form>
//   )
// }

// export default reduxForm({
//   form: 'fieldArrays', // a unique identifier for this form
// })(FieldArraysForm)