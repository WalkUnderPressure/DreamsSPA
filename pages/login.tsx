import React, { Component } from 'react';
import Layout from '../Layout'
import { xRead } from '../src';
import { METHODS } from '../COMMON';
// import { createBrowserHistory } from 'history';
// import { withRouter, Redirect, Router } from 'react-router-dom';

import Router from 'next/router'


interface ILoginProps {
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

        xRead('/api/auth/login', this.state, METHODS.POST)
            .then(resolve => {
                const element = resolve.data;
                console.log('log in resolve : ', element);

                if (element) {
                    console.log('log in successfully!');
                    for (let field in element) {
                        localStorage.setItem(field, element && element[field]);
                    }

                    // REDIRECT
                    Router.push('/');
                } else {
                    console.log('log in not successfully!');
                    alert(resolve.message);
                }
            })
    }
}

export default Login;