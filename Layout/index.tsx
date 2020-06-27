import React, { Component } from 'react';
import Link from 'next/link';
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
                <div>
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
                <div>
                    <Link href="/login" as="/login"><a>Login</a></Link>
                    <Link href="/registration" as="/registration"><a>Registration</a></Link>
                </div>
            )
        }
        
        return (
            <div 
            className='container lg mx-auto h-auto border-solid border-8 border-gray-600'
            >
                <header>
                    <h1 className=''>Header</h1>
                    {userState}
                </header>
                {this.props.children}
                <footer>
                    <h1>footer</h1>
                    {logInAndReg} 
                </footer>
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