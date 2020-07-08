import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ILogInFields } from 'redux/actions/UserAuthActions';
import { userLogOutRequest } from '../redux/actions/UserAuthActions';
import { FaHeart, FaFan, FaCircleNotch, FaArrowCircleDown, FaCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import posed, { PoseGroup } from 'react-pose';
import Link from 'next/link';


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
                <div className='w-1/2 flex flex-row items-center justify-around font-black text-teal-600 '>
                    <Link href='/' as='/'>
                        <a className='hover:text-black'>Home</a>
                    </Link>
                    <Link href='/dreans' as='/dreans'>
                        <a className='hover:text-black'>Dreans</a>
                    </Link>
                    {user && <Link href='/news' as='/news'>
                        <a className='hover:text-black'>News</a>
                    </Link>}
                </div>
            )
        }

        const headerUserProfile = () => {
            const isOpen = this.state.profileIsOpen;
            return (
                <div className='flex flex-row relative'>
                    <h1 className='mx-2'>Welcome, {user && user.get("firstName")}</h1>
                    {!isOpen && <button onClick={this.changeProfileState}> <FaCaretDown className='' /> </button>}
                    
                    {isOpen && <div className='m-5 mr-2 p-4 flex flex-col rounded bg-ocean-900 text-teal-500 text-xl absolute top-0 right-0'>
                        <button onClick={this.changeProfileState} className='flex justify-center'> <FaCaretUp className='' /> </button>
                        <a className='my-2 px-4 py-2 rounded bg-ocean-500 hover:bg-ocean-700'>Profile</a>
                        <a className='my-2 px-4 py-2 rounded bg-ocean-500 hover:bg-ocean-700'>Notifications</a>
                        <button onClick={this.handleLogOut} className='my-2 px-4 py-2 rounded bg-ocean-500 hover:bg-ocean-700'>Sign Out</button>
                    </div> }
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
            return (
                <nav className='border-2 border-black border-solid sticky top-0'>
                    <h1 className='sticky top-0'>User Navigation</h1>
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </nav>
            )
        }


        return (
            <div className='w-full bg-red-400'>
                <header className='flex flex-row items-center justify-between p-4 bg-white sticky top-0 z-50'>
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
                    {user? headerUserProfile() : headerAuth()}
                </header>

                <div className='flex flex-row bg-red-500 '>
                    {user? userNavigation() : null}
                    <div className='w-full'>
                        { this.props.children }
                    </div>
                </div>
                <footer className='w-full bg-white z-50'>
                    <div className='flex flex-row justify-between text-teal-600'>
                        <div className='flex items-center p-8 font-medium leading-5'>© 2020 Brinzey Oleksandr. All Rights Reserved.</div>
                        <div className='w-1/3 flex flex-row items-center p-8 font-medium'>
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
                        <div className='flex items-center p-8'>
                            <h1 className='text-black font-extrabold'>{dreansWritten}</h1>
                            <p className='mx-2'>dreans are written</p>
                            <FaFan className='text-4xl text-ocean-700' />
                        </div>
                    </div>
                </footer>
            </div>
        )
    }

    handleLogOut = () => {
        console.log('log out click !');
        this.props.userLogOutRequest({ email: this.props.user.get("email"), password: 'template' });
    }

    changeProfileState = () => {
        this.setState({
            profileIsOpen: !this.state.profileIsOpen
        })
    }
}

const mapStateToProps = (state) => ({
    user: state.identity.get("user"),
})

const mapDispatchToProps = (dispatch) => ({
    userLogOutRequest: (data: ILogInFields) => dispatch(userLogOutRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)