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

    render() {
        return (
            <div className={'flex lg:flex-row w-full h-full bg-pink-100 flex-col-reverse'}>
                <div className={'mx-auto lg:w-3/5 lg:my-0 my-20 w-full h-full flex items-center justify-center min-w-3/5 '}>
                    <LoginForm className='w-3/5' onSubmit={ values => this.props.userLogInRequest(values) } />
                    <RegistrationForm></RegistrationForm>
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
                    <img className='h-2/3' src='/static/login-visual.svg'/>
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
