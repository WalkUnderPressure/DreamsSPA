import React, { Component } from 'react';
import Layout from '../Layout';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';
import { userLogInRequest } from '../redux/actions/UserAuthActions';
import RegistrationForm from '../components/RegistrationForm'; 

interface ILoginProps {
    userLogInRequest: (values) => void;
}

interface ILoginState {

}
class Login extends Component<ILoginProps, ILoginState>{
    state = {
        isSignIn: false,
    }

    render() {
        return (
            <div className={'flex lg:flex-row w-full lg:h-full bg-pink-100 flex-col-reverse'}>
                {/* lg:min-w-3/5   lg:w-3/5 lg:my-0 //lg:min-w-2/5*/}
                <div className={'w-full my-20 lg:w-3/5 lg:min-w-2/5 lg:my-0 mx-auto h-full flex items-center justify-center'}>
                    <LoginForm className='w-full lg:w-3/5 sm:w-3/5' onSubmit={ values => this.props.userLogInRequest(values) } />
                    {/* {this.state.isSignIn?  : <RegistrationForm/> } */}
                </div>
                <div className='w-full bg-ocean-500 flex flex-col'>
                    <div className='flex-1 flex flex-col w-full text-center justify-center content-center'>
                        <h1 className='my-4 text-3xl font-extrabold font-black'>
                            Amazing Wireframes
                        </h1>
                        <p className='text-2xl font-bold text-gray-700'>
                            User Experience & Interface Design, Product Strategy <br/>
                            Web Application SaaS Solutions
                        </p>
                    </div>
                    <img className='h-2/3 w-full' src='/static/login-visual.svg'/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    userLogInRequest: (values) => dispatch(userLogInRequest(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
