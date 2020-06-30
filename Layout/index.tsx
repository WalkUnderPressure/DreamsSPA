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
                <div className={'my-5 flex flex-col justify-between'}>
                    <p className='text-red-500 text-xl'>Welcome <span className={'text-red-900 text-2xl font-bold'}>{user.get("firstName")}</span></p>
                    <button onClick={this.handleLogOut} className={'bg-transparent hover:bg-red-600 ' +
                    '   text-red-600 font-semibold hover:text-white py-2 px-4 ' +
                    '   border border-red-800 hover:border-transparent rounded'}>
                        LogOut
                    </button>
                </div>
            )
            logInAndReg = (
                <div className={'my-5 h-full flex flex-col justify-start'}>
                    <Link href="/" as="/">
                        <button className={'my-2 bg-transparent hover:bg-red-300 ' +
                        '   text-red-600 font-semibold hover:text-white py-2 px-4 ' +
                        '   border border-red-800 hover:border-transparent rounded'}>
                            Go to Home
                        </button>
                    </Link>
                    <Link href="/dreans" as="/dreans">
                        <button className={'my-2 bg-transparent hover:bg-red-300 ' +
                        '   text-red-600 font-semibold hover:text-white py-2 px-4 ' +
                        '   border border-red-800 hover:border-transparent rounded'}>
                            Go to Dreans
                        </button>
                    </Link>
                </div>
            )

        } else {
            userState = (
                <div className={'my-5 flex flex-col justify-between'}>
                    <p className='text-red-500 text-xl font-bold'>Please LogIn or Register!</p>
                </div>
            )
            logInAndReg = (
                <div className={'my-5 h-full flex flex-col justify-start'}>
                    <Link href="/login" as="/login">
                        <button className={'my-2 bg-transparent hover:bg-red-300 ' +
                        '   text-red-600 font-semibold hover:text-white py-2 px-4 ' +
                        '   border border-red-800 hover:border-transparent rounded'}>
                            Login
                        </button>
                    </Link>
                    <Link href="/registration" as="/registration">
                        <button className={'my-2 bg-transparent hover:bg-red-300 ' +
                        '   text-red-600 font-semibold hover:text-white py-2 px-4 ' +
                        '   border border-red-800 hover:border-transparent rounded'}>
                            Registration
                        </button>
                    </Link>
                </div>
            )
        }
        const size = 32;
        return (
            <div 
            className='container lg mx-auto h-auto'
            >
                <header className='items-center flex flex-row justify-around p-2
                    bg-white rounded-br-full rounded-tl-full border-solid border-black border-b-4'>
                    <div className={`flex content-center rounded-full h-${size} w-${size}`}>
                        <p className='m-auto font-mono text-6xl text-red-600'>夢</p>
                    </div>
                    <div className={''}>
                        <h1 className='text-6xl text-red-900'>Board of Dreams and Plans</h1>
                    </div>
                </header>
                <div className={'flex flex-row'}>
                    <nav className={'flex flex-col justify-between bg-white px-4 sticky top-0 opacity-100'}>
                            {userState}
                            {logInAndReg}
                    </nav>
                    <div className={'w-full px-10'}>
                        {this.props.children}
                    </div>
                </div>
                <footer className={'items-center flex flex-row justify-around p-2 ' +
                    'bg-white opacity-100 rounded-tr-full rounded-bl-full'}>
                    <h1 className={'text-xl'}>© Brinzey Oleksandr 2020. All Rights Reserved.</h1>
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