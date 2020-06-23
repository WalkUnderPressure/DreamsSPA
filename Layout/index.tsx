import React, { Component } from 'react';
import styles from './layout.module.css';
import Link from 'next/link'
import store from 'store';
import { xSave } from '../src';
import Router from 'next/router';
import { connect } from 'react-redux';
import { IIdentity } from 'COMMON';
import { ILogInFields } from 'redux/actions/UserAuthActions';
import { userLogOutRequest } from '../redux/actions/UserAuthActions';

interface ILayoutProps {
    children: any;
    user?: IIdentity;
    userLogOutRequest: (data: ILogInFields) => void;
}
interface ILayoutState {

}
class Layout extends Component<ILayoutProps, ILayoutState>{
    constructor(props: ILayoutProps) {
        super(props);
        this.state = {
        }
    }
    render() {
        let user = this.props.user;
        let userState = null;
        let logInAndReg = null;
        if (user) {
            userState = (
                <div>
                    <p>Welcome {user.firstName}</p>
                    <button onClick={this.handleLogOut}>Log Out</button>
                </div>
            )
            logInAndReg = (
                <div className={styles.footerContainer}>
                    <Link href="/" as="/"><a>Go to Home</a></Link>
                    <Link href="/dreans" as="/dreans"><a>Go to Dreans</a></Link>
                </div>
            )

        } else {
            userState = (
                <div>
                    <p>Please LogIn or Registration!</p>
                </div>
            )
            logInAndReg = (
                <div className={styles.footerContainer}>
                    <Link href="/login" as="/login"><a>Login</a></Link>
                    <Link href="/registration" as="/registration"><a>Registration</a></Link>
                </div>
            )
        }

        return (
            <div className={styles.layoutContainer}>
                <h1>Header</h1>
                {userState}
                {this.props.children}
                <h1>footer</h1>
                {logInAndReg}
            </div>
        )
    }

    handleLogOut = () => {
        console.log('log out click !');
        this.props.userLogOutRequest({ email: this.props.user.email, password: 'template' });
    }
}

const mapStateToProps = (state) => ({
    user: state.identity.user,
})

const mapDispatchToProps = (dispatch) => ({
    userLogOutRequest: (data: ILogInFields) => dispatch(userLogOutRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)