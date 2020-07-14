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
    checked: boolean;
}
interface IInputFieldState {

}

class InputField extends Component<WrappedFieldProps & IInputFieldProps, IInputFieldState> {
   
    public static defaultProps = {
        size: InputSize.medium
    };

    render() {
        const { label, id, input, type, checked, meta: { touched, error, warning, asyncValidating } } = this.props;
        // console.log('input props --------> \n', {...this.props});
        // if(type== 'date'){
        //     let inputValue = input.value;
        //     if(inputValue === ''){
        //         inputValue = new Date().getTime();
        //     }
        //     input.value = new Date(inputValue).toISOString().slice(0,10)
            
        //     console.log('date of event -> ', input.value);
        // }
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
                inputField = <ReactDatePicker className='w-full' selected={new Date(input.value)} onChange={ input.onChange } />
                break;
            case 'selector':
                console.log('value -> ', input.value);
                
                inputField = <input id={id} className='' type='text' {...input} checked={input.value === 'true'} onChange={ input.onChange } onClick={ this.changeRadioValue } /> 
                break;
            default:
                // console.log('input area ', {...this.props});
                inputField = <input id={id} {...input} type={type} placeholder={label} className='appearance-none outline-none text-sm w-full' />
                break;
        }

        // console.log('input field ---> ', inputField);

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

    changeRadioValue = () => {
        const prev = this.props.input.value;
        const next = prev === 'true'? 'false' : 'true';
        console.log('prev value : ', prev);
        console.log('next value : ', next);
        
        this.props.input.onChange(next);
    }
}

export default InputField;
