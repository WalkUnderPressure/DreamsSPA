import React, {Component} from 'react';
import styles from './layout.module.css';
import Link from 'next/link'
import store from 'store';
import {cookie} from "express-validator";

interface ILayoutProps{

}
interface ILayoutState{

}

export default class Layout extends Component<ILayoutProps, ILayoutState>{
    constructor(props) {
        super(props);
    }
    render() {
        let user = store.get('email')
        let userState = null;
        if(user) {
            userState = (
                <div>
                    <p>Welcome {user}</p>
                    <button onClick={this.handleLogOut}>Log Out</button>
                </div>
            )
        }else{
            userState = (
                <div>
                    <p>Please LogIn or Registration!</p>
                    <Link href="/login" as="/login"><a>Login</a></Link>
                    <br/><br/>
                    <Link href="/registration" as="/registration"><a>Registration</a></Link>
                </div>
            )
        }

        return(
            <div className={styles.layoutContainer}>
                <h1>Header</h1>
                {userState}
                {this.props.children}
                <h1>footer</h1>
                <div className={styles.footerContainer}>
                    <Link href="/" as="/"><a>Go to Home</a></Link>
                    <Link href="/dreans" as="/dreans"><a>Go to Dreans</a></Link>
                    <Link href="/login" as="/login"><a>Login</a></Link>
                    <Link href="/registration" as="/registration"><a>Registration</a></Link>
                </div>
            </div>
        )
    }

    handleLogOut = () => {
        console.log('log out click !');
        store.clearAll();
    }
}