import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ILogInFields } from 'redux/actions/UserAuthActions';
import { userLogOutRequest } from '../redux/actions/UserAuthActions';
import { FaHeart, FaFan, FaCircle, FaCaretDown, FaTimes, FaEnvelope, FaUserCircle, FaMailBulk, FaPlane, FaUserPlus, FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import posed, { PoseGroup } from 'react-pose';
import Link from 'next/link';
import Router from 'next/router';


const Flicker = posed.div({
    enter: {
        opacity: 1,
        scale: 1,
        delay: 400,
        transition: {
            // scale: { delay: 600 },
            default: { duration: 800 }
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        delay: 500,
        transition: { duration: 550 }
    }
});

interface ILayoutProps {
    children: any;
    user?: Map<string, any>;
    userLogOutRequest: (data: ILogInFields) => void;
}
interface ILayoutState {
    developers: Array<string>,
    currentItem: number,
    profileIsOpen: boolean,
}

class Layout extends Component<ILayoutProps, ILayoutState>{
    constructor(props: ILayoutProps) {
        super(props);
        this.state = {
            developers: ['Alexander', 'Ukraine', 'ZP'],
            currentItem: 0,
            profileIsOpen: false,
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.incrementIndex();
        }, 4500);
    }

    incrementIndex = () => {
        if (this.state.developers) {
            const countOfDevelopers: number = this.state.developers.length;
            const index = this.state.currentItem;
            let nextIndex = 0;

            if (index < countOfDevelopers) {
                nextIndex = index + 1;
            }

            this.setState({
                currentItem: nextIndex
            })
        }
    }

    render() {
        let user = this.props.user;

        const dreansWritten = '12.222.555'

        const headerMenu = () => {
            return (
                <div className='px-4 py-2 w-1/2 flex flex-row items-center justify-center font-black text-teal-600 text-xl'>
                    <Link href='/' as='/'>
                        <a className='mx-2 px-4 py-2 hover:text-black'>Home</a>
                    </Link>
                    <Link href='/dreans' as='/dreans'>
                        <a className='mx-2 px-4 py-2 hover:text-black'>Dreans</a>
                    </Link>
                    {user && <Link href='/news' as='/news'>
                        <a className='mx-2 px-4 py-2 hover:text-black'>News</a>
                    </Link>}
                </div>
            )
        }

        const userProfile = () => {
            const countOfNewMessages = 12;
            const fullName = `${user.get('firstName')} ${user.get('lastName')}`;
            const userRole = user.get('role');
            const userEmail = user.get('email');

            return (
                <div className='p-8 rounded bg-teal-200 absolute top-0 right-0'>
                    <div className='pb-4 flex flex-row items-center justify-between'>
                        <h1 className='text-xl text-black'>User Profile <span className='text-sm text-teal-500' >{countOfNewMessages} messages</span></h1>
                        <button onClick={this.changeProfileState}
                            className='ml-4 p-1 text-teal-500 rounded border border-teal-500 border-solid hover:text-white hover:bg-ocean-900 hover:border-transparent focus:outline-none'> <FaTimes className='text-xs' /> </button>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-20 h-20 rounded bg-blue-400 text-center'>IMG</div>
                        <div className='ml-4 flex flex-col'>
                            <h1 className='text-xl text-black hover:text-ocean-900'> {fullName} </h1>
                            <h1 className='my-1 text-sm text-teal-500'> {userRole} </h1>
                            <div className='flex flex-row items-center text-sm'>
                                <FaEnvelope className='text-gray-600' />
                                <p className='mx-2 hover:text-ocean-900'>{userEmail}</p>
                            </div>
                            <button onClick={this.handleLogOut}
                                className='my-1 px-3 py-1 rounded text-gray-600 font-medium bg-white border border-solid border-gray-600 
                            hover:text-white hover:bg-ocean-900 hover:border-transparent focus:outline-none'>Sign Out</button>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <ul className='text-sm'>
                            <li className='my-2 flex flex-row items-center text-black hover:text-teal-600 cursor-pointer'>
                                <FaUserCircle className='text-teal-500 text-3xl' />
                                <div className='mx-4'>
                                    <h1 className=''>My Profile</h1>
                                    <p className='text-sm text-teal-500'>Account settings and more</p>
                                </div>
                            </li>
                            <li className='my-2 flex flex-row items-center text-black hover:text-teal-600 cursor-pointer'>
                                <FaMailBulk className='text-teal-500 text-3xl' />
                                <div className='mx-4'>
                                    <h1 className=''>My Messages</h1>
                                    <p className='text-sm text-teal-500'>Inbox and tasks</p>
                                </div>
                            </li>
                            <li className='my-2 flex flex-row items-center text-black hover:text-teal-600 cursor-pointer'>
                                <FaPlane className='text-teal-500 text-3xl' />
                                <div className='mx-4'>
                                    <h1 className=''>My Activities</h1>
                                    <p className='text-sm text-teal-500'>Logs and notifications</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }

        const headerUserProfile = () => {
            const isOpen = this.state.profileIsOpen;
            return (
                <div className='flex flex-row items-center'>
                    <h1 className='mx-2 text-black font-base text-xl'>
                        Welcome,
                        <span className='ml-2 font-black text-ocean-900'>{user && user.get("firstName")}</span>
                    </h1>
                    <button onClick={this.changeProfileState}
                        className='text-black text-xl focus:outline-none'>
                        <FaCaretDown className='' />
                    </button>
                    {isOpen && userProfile()}
                </div>
            )
        }

        const headerAuth = () => {
            return (
                <div className='text-teal-500 text-sm font-light'>
                    <Link href="/auth/[id]" as="/auth/login">
                        <a className={'m-2 py-2 px-4 bg-transparent rounded focus:outline-none focus:bg-ocean-900'}>
                            Sign In
                        </a>
                    </Link>
                    <Link href="/auth/[id]]" as="/auth/registration">
                        <a className={'m-2 py-2 px-4 bg-ocean-500 hover:bg-ocean-700 text-white rounded focus:outline-none focus:bg-ocean-900'}>
                            Sign Up
                        </a>
                    </Link>
                </div>
            )
        }

        const userNavigation = () => {
            const isNight = true;
            const dreansColor = isNight? '-blue-800' : '-yellow-400';
            return (
                <nav className='px-2 py-4 h-auto flex flex-col text-xl bg-teal-200 rounded-tr-lg rounded-br-lg fixed'>
                    <Link href='/myDreans' as='/myDreans'>
                        <button className={`my-1 p-2 rounded text${dreansColor} bg-transparent border border-solid border-teal-500 hover:text-white hover:bg${dreansColor} hover:border-transparent focus:outline-none`}
                        title='My Dreans'>
                            {isNight ? <FaMoon /> : <FaSun />}
                        </button>
                    </Link>
                    
                    <button className='my-1 p-2 rounded text-blue-600 bg-transparent border border-solid border-teal-500 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none'
                    title='Find Friends'>
                        <FaSearch />
                    </button>
                    <button className='my-1 p-2 rounded text-yellow-600 bg-transparent border border-solid border-teal-500 hover:text-white hover:bg-yellow-600 hover:border-transparent focus:outline-none'
                    title='Friends Request'>
                        <FaUserPlus />
                    </button>
                </nav>
            )
        }


        return (
            <div onClick={this.closeOpenedUserProfile}
                className='w-full bg-white'>
                <header className='flex flex-col sm:flex-row items-center justify-between p-4 bg-white sticky top-0 z-50'>
                    <div className='flex flex-row items-center'>
                        <div className='relative bg-ocean-900 p-2 rounded align-middle'>
                            <FaCircle className='text-red-600 text-5xl' />
                            <h1 className='absolute mx-auto top-0 inset-x-0 text-center text-4xl text-white font-hairline'>夢</h1>
                        </div>
                        <div className='flex flex-row text-black font-black text-xl mx-4'>
                            <div>
                                <p className=''>Drea<span className='text-red-600 p-0 my-0'>m</span></p>
                                <p className='text-right'><span className='text-red-600 p-0 my-0'>Pla</span>n</p>
                            </div>
                            <div className='flex items-center'>
                                <p className='text-ocean-700 p-0 my-0'>&</p>
                            </div>
                        </div>
                    </div>
                    {headerMenu()}
                    {user ? headerUserProfile() : headerAuth()}
                </header>
                <div className='flex flex-row'>
                    {user && userNavigation()}
                    
                    <div className='ml-16 w-full'>
                        <div className='container mx-auto flex justify-center items-center bg-teal-300 p-2'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <footer className='w-full flex flex-col sm:flex-row text-teal-600 font-medium bg-white z-50'>
                    <div className='flex-1 flex flex-row justify-center items-center p-4 leading-5'>
                        <h1 className='mx-1'>© 2020 Brinzey Oleksandr. </h1>
                        <h1 className='mx-1'>All Rights Reserved.</h1>
                    </div>
                    <div className='flex-1 flex flex-row justify-center items-center p-4 '>
                        <div className='flex flex-row'>
                            Made with <FaHeart className='text-red-500 text-xl mx-2' /> remotely from
                        </div>
                        <PoseGroup>
                            <Flicker className='w-10' key={this.state.currentItem}>
                                <p className='ml-2'>
                                    {this.state.developers && this.state.developers[this.state.currentItem] || 'Home'}
                                </p>
                            </Flicker>
                        </PoseGroup>
                    </div>
                    <div className='flex-1 flex items-center justify-center p-4'>
                        <h1 className='text-black font-extrabold'>{dreansWritten}</h1>
                        <p className='mx-2'>dreans are written</p>
                        <FaFan className='text-4xl text-ocean-700' />
                    </div>
                </footer>
            </div>
        )
    }

    handleLogOut = () => {
        this.props.userLogOutRequest({ email: this.props.user.get("email"), password: 'template' });
    }

    changeProfileState = () => {
        this.setState({
            profileIsOpen: !this.state.profileIsOpen
        })
    }

    closeOpenedUserProfile = () => {
        if (this.state.profileIsOpen) {
            this.changeProfileState();
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.identity.get("user"),
})

const mapDispatchToProps = (dispatch) => ({
    userLogOutRequest: (data: ILogInFields) => dispatch(userLogOutRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)