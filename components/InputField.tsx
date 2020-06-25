import React, { Component } from 'react';

interface IInputFieldProps {
    id: string,
    input: any,
    type: any,
    placeholder: string,
    meta: {
        touched: any,
        error: any,
        warning: any
    }
}

interface IInputFieldState {

}

class InputField extends Component<IInputFieldProps, IInputFieldState> {

    render() {
        const { id, input, type, placeholder, meta: { touched, error, warning } } = this.props;
        // console.log('input props --------> \n', this.props);
        return (
            <div>
                <input id={id} {...input} placeholder={placeholder} type={type} />
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        )
    }
}

export default InputField;