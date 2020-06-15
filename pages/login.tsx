import React, { Component } from 'react';
import Layout from '../Layout'

interface ILoginProps {
    login: string;
    password: string;
}

interface ILoginState {
    login: string;
    password: string;
}

class Login extends Component<ILoginProps, ILoginState>{
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    render(){
        return(
            <Layout>
                <h1>Login</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <label htmlFor="login">Login: </label>
                    <input onChange={this.handlerOnChange} value={this.state.login} type="text" id="login" name="login"/>
                    <br/><br/>
                    <label htmlFor="password">Password: </label>
                    <input onChange={this.handlerOnChange} value={this.state.password} type="password" id="password" name="password"/><br/><br/>
                    <input type="submit" value="LogIn"/>
                </form>
            </Layout>
        )
    }

    handlerOnChange = (event) => {
        const value : string = event.target.value;
        const name : string = event.target.name;

        let newState = {...this.state} ;
        newState[name] = value;
        this.setState({...newState})
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log('LogIn Click!');
        console.log('login : ', this.state.login);
        console.log('password : ', this.state.password);

        document.cookie = `login=${this.state.login};`;
        document.cookie = `password=${this.state.password};`;
    }
}

export default Login;