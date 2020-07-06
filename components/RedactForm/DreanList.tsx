import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, WrappedFieldArrayProps, InjectedFormProps, GenericFieldArray } from 'redux-form';
import { required } from 'redux/validators';
import InputField from 'components/InputField';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

interface IDreanListProps extends WrappedFieldArrayProps<{}> {
  listName: string;
}

class DreanList extends Component<IDreanListProps>{

  render() {
    console.log('drean list props => ', this.props);
    const { fields, listName, meta: { error, submitFailed } } = this.props;
    return (
      <ul className={'w-full px-3'}>
        <div className={'w-full flex flex-row justify-between'}>
          <h1 className={'mb-6 text-left text-base'}>{listName}</h1>
          <button type="button" title="Add new item" onClick={() => fields.push('')} 
            className='py-2 px-4 h-full flex flex-row justify-around items-center text-white font-semibold bg-blue-300 hover:bg-blue-400 rounded focus:outline-none focus:bg-blue-500'>
              <FaPlusCircle className='text-lg mr-2'/>
              Add New Item
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
                validate={[required]}/>
            </div>
            <div className='h-full pb-8 ml-1'>
              <button type="button" title="Remove Item"
              onClick={() => fields.remove(index)}
              className={'h-full p-2 bg-white hover:bg-purple-700 ' +
              'text-purple-700 hover:text-white text-base ' +
              'rounded focus:outline-none focus:bg-purple-800'}>
                <FaMinusCircle className='text-lg'/>
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default DreanList;