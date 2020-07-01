import React, { Component } from 'react';
import { WrappedFieldProps } from 'redux-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

interface IInputFieldProps {
    id: string;
    type?: string;
    placeholder: string;
}
interface IInputFieldState {

}

class InputDateField extends Component<WrappedFieldProps & IInputFieldProps, IInputFieldState> {

    render() {
        const { id, input, type, placeholder, meta: { touched, error, warning } } = this.props;
        console.log('input props --------> \n', { ...this.props });
        if (input.value === ''){
            input.value = new Date();
        }
        // const selectedDate = new Date(this.props.input.value);
        return (
            <div className='flex flex-col w-full'>

                <div className='flex flex-col justify-center'>
                    {placeholder ? <p
                        className='text-center'
                    >{placeholder}</p> : ''}

                    <DatePicker
                        selected={new Date(input.value)} onChange={this.handleChange}
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

    handleChange = date => {
        console.log('on change date -> ', date);
        this.props.input.value = date
        this.setState({
            startDate: date
        });
    };
}

export default InputDateField;