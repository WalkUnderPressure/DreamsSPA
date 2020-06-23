import React, { Component } from 'react';
import Layout from '../Layout'
import { xSave } from '../src';
import Router from 'next/router';
import { connect } from 'react-redux';
import { userRegistrationRequest } from '../redux/actions/UserAuthActions'; 

interface IRegistrationProps { 
    userRegistrationRequest: (data: any) => void;
}

interface IRegistrationState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

class Registration extends Component<IRegistrationProps, IRegistrationState>{
    constructor(props: IRegistrationProps) {
        super(props);
        this.state = {
            ...{} as IRegistrationState
        }
    }

    render() {
        return (
            <Layout>
                <h1>Registration</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <input type='hidden' name='timezone' value={ Intl.DateTimeFormat().resolvedOptions().timeZone } />

                    <label htmlFor="firstName">First Name: </label>
                    <input onChange={this.handlerOnChange} value={this.state.firstName} type="text" id="firstName" name="firstName" />
                    <br /><br />

                    <label htmlFor="lastName">Last Name: </label>
                    <input onChange={this.handlerOnChange} value={this.state.lastName} type="text" id="lastName" name="lastName" />
                    <br /><br />

                    <label htmlFor="email">Email: </label>
                    <input onChange={this.handlerOnChange} value={this.state.email} type="text" id="email" name="email" />
                    <br /><br />
                    <br /><br />
                    <label htmlFor="password">Password: </label>
                    <input onChange={this.handlerOnChange} value={this.state.password} type="password" id="password" name="password" /><br /><br />


                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input onChange={this.handlerOnChange} value={this.state.confirmPassword} type="password" id="confirmPassword" name="confirmPassword" /><br /><br />
                    <br /><br />

                    <input type="submit" value="Registration" />
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
        console.log('Registration Click!');
        console.log('state : ', this.state);

        this.props.userRegistrationRequest(this.state);
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    userRegistrationRequest: (data: any) => dispatch(userRegistrationRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)