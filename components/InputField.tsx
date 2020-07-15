import React, { Component } from 'react';
import { WrappedFieldProps } from 'redux-form';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css"
import ReactDatePicker from 'react-datepicker';

// import { dreanDateOfEventChange } from '../redux/actions/redactAddFormActions';

enum InputSize {
    large, medium, small
}
interface IInputFieldProps {
    id: string;
    type?: string;
    placeholder: string;
    size: InputSize,
    label: string;
}
interface IInputFieldState {

}

class InputField extends Component<WrappedFieldProps & IInputFieldProps, IInputFieldState> {
   
    public static defaultProps = {
        size: InputSize.medium
    };

    render() {
        const { label, id, input, type, meta: { touched, error, warning, asyncValidating } } = this.props;
        
        const errorColor = touched && error? ' border-red-500' : ' border-gray-500';
        let inputField = null;

        switch (type) {
            case 'textarea':
                console.log('text area ');
                inputField = <textarea id={id} {...input} placeholder={label} rows={5} className='appearance-none outline-none text-sm w-full resize-y' />
                break;
            case 'date':
                if (input.value === ''){
                    input.value = new Date();
                }
                console.log('date area ');
                inputField = <ReactDatePicker className='w-full focus:outline-none' selected={new Date(input.value)} onChange={ input.onChange } />
                break;
            default:
                inputField = <input id={id} {...input} type={type} placeholder={label} className='appearance-none outline-none text-sm w-full' />
                break;
        }

        return (
            <div className='flex flex-col w-full'>
                
                {label && <label className='text-base'>{label}</label>}
                    
                <div className={'flex flex-row border-solid border rounded-lg p-4 ' + errorColor}>
                    {inputField}
                    <div className='w-2 mx-2 my-auto'>
                        {touched && ((!error && <FaCheck className='text-green-500'/> ) || (!warning && <FaExclamationCircle className=' text-red-600'/> ))}
                    </div>
                </div>
                <div className='text-sm text-red-600 h-8'>
                    {touched && ((error && <p>{error}</p>) || (warning && <p>{warning}</p>))}
                </div>
            </div>
        )
    }
}

export default InputField;
