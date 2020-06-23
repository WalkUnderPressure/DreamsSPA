import React, { Component } from 'react';
import Layout from '../Layout'
import { connect } from 'react-redux';
import { userLogInRequest, ILogInFields } from '../redux/actions/UserAuthActions';


interface ILoginProps {
    userLogInRequest: (data: ILogInFields ) => void;
    email: string;
    password: string;
}

interface ILoginState {
    email: string;
    password: string;
}

class Login extends Component<ILoginProps, ILoginState>{
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        return (
                <Layout>
                    <h1>Login</h1>
                    <form onSubmit={this.handleOnSubmit}>
                        <label htmlFor="email">Email: </label>
                        <input onChange={this.handlerOnChange} value={this.state.email} type="text" id="email" name="email" />
                        <br /><br />
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.handlerOnChange} value={this.state.password} type="password" id="password" name="password" /><br /><br />
                        <input type="submit" value="LogIn" />
                    </form>
                </Layout>
        )
    }

    handlerOnChange = (event) => {
        const value: string = event.target.value;
        const name: string = event.target.name;

        let newState = { ...this.state };
        newState[name] = value;
        this.setState({ ...newState })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log('LogIn Click!', this.state);
        const data: ILogInFields = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.userLogInRequest(data);
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    userLogInRequest: (data: ILogInFields) => dispatch(userLogInRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
