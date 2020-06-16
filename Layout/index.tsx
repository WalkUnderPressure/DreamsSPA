import React from 'react';
import styles from './layout.module.css';
import Link from 'next/link'

const Layout = ({children})=>{
    // const myStorage = window.localStorage;
    // const user = myStorage.getItem("email");
    return(
        <div className={styles.layoutContainer}>
            <h1>Header</h1>
            {/* <p>{user? `Welcome ${user}` : 'LogIn'}</p> */}

            {children}

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

export default Layout;