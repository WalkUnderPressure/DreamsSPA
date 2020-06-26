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
            <div>
                <input id={id} {...input} type={type} placeholder={placeholder} />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        )
    }
}

export default InputField;
