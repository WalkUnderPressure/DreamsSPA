import React, { Component } from 'react';
import { WrappedFieldProps } from 'redux-form';

interface IInputFieldProps {
    id: string;
    type?: string;
    placeholder: string;
}
interface IInputFieldState {

}

class InputField extends Component<WrappedFieldProps & IInputFieldProps, IInputFieldState> {

    render() {
        const { id, input, type, placeholder, meta: { touched, error, warning, asyncValidating } } = this.props;
        // console.log('input props --------> \n', {...this.props});
        
        return (
            <div className='flex flex-col'>
                <div 
                className='flex flex-col justify-center'
                >
                    <p
                        className='text-center'
                    >{placeholder}</p>
                    <input id={id} {...input} type={type} placeholder={placeholder}
                    className='block appearance-none w-10/12 bg-white border border-grey-light hover:border-grey p-2 mx-auto rounded shadow'
                    />
                </div>
                
                <div 
                className='font-bold text-red-900 w-full my-auto px-20'
                >
                    {touched && ((error && <p>{error}</p>) || (warning && <p>{warning}</p>))}
                </div>
            </div>
        )
    }
}

export default InputField;
