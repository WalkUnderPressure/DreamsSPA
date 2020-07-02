import React, { Component } from 'react';
import { WrappedFieldProps } from 'redux-form';
import { FaCheck, FaExclamationCircle } from 'react-icons/fa';

// import CheckIcon from '@material-ui/icons/Check';
// import ErrorIcon from '@material-ui/icons/Error';
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
        const { label, id, input, type, placeholder, meta: { touched, error, warning, asyncValidating } } = this.props;
        console.log('input props --------> \n', {...this.props});
        if(type== 'date'){
            let inputValue = input.value;
            if(inputValue === ''){
                inputValue = new Date().getTime();
            }
            input.value = new Date(inputValue).toISOString().slice(0,10)
            
            console.log('date of event -> ', input.value);
        }
        const errorColor = error? ' border-red-500' : ' border-gray-500';

        return (
            <div className='flex flex-col w-full'>
                
                {label && <label className='text-base'>{label}</label>}
                    
                <div
                    className={'flex flex-row bg-white border-solid border-2 rounded-lg p-4 ' + errorColor}
                >
                    <input id={id} {...input} type={type} placeholder={placeholder}
                        className='appearance-none outline-none text-sm w-full'
                    />
                    <div className='w-2 mr-2'>
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
