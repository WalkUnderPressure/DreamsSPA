import React, { Component } from 'react';
import styles from './layout.module.css';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import { ILogInFields } from 'redux/actions/UserAuthActions';
import { userLogOutRequest } from '../redux/actions/UserAuthActions';

interface ILayoutProps {
    children: any;
    user?: Map<string, any>;
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
                    <p className='text-red-500'>Welcome {user.get("firstName")}</p>
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
                <h1 className='text-green-800'>Header</h1>
                {userState}
                {this.props.children}
                <h1>footer</h1>
                {logInAndReg}
            </div>
        )
    }

    handleLogOut = () => {
        console.log('log out click !');
        this.props.userLogOutRequest({ email: this.props.user.get("email"), password: 'template' });
    }
}

const mapStateToProps = (state) => ({
    user: state.identity.get("user"),
})

const mapDispatchToProps = (dispatch) => ({
    userLogOutRequest: (data: ILogInFields) => dispatch(userLogOutRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)