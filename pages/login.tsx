import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

import { connect } from 'react-redux';
import { userLogInRequest } from '../redux/actions/UserAuthActions';
import { userRegistrationRequest } from '../redux/actions/UserAuthActions';

import posed, { PoseGroup } from "react-pose";


const FlyUpAnimationContainer = posed.div({
    // enter: {
    //     y: 0,
    //     opacity: 1,
    //     delay: 300,
    //     transition: {
    //       y: { type: 'spring', stiffness: 1000, damping: 15 },
    //       default: { duration: 300 }
    //     }
    //   },
    //   exit: {
    //     y: 50,
    //     opacity: 0,
    //     transition: { duration: 150 }
    //   }
    // enter: { y: 0, scale: 1, opacity: 1, delay: 3000,  transition: { duration: 1300 } },
    // exit: { y: 1550, scale: 0, opacity: 0, transition: { duration: 900 } }
});


interface ILoginProps {
    userLogInRequest: (values) => void;
    userRegistrationRequest: (data: any) => void;
}

interface ILoginState {

}
class Login extends Component<ILoginProps, ILoginState>{
    state = {
        isSignIn: true,
    }

    render() {
        // const hide = ' opacity-100 scale-0 transform translate-y-full ';
        // const show = ' opacity-100 transform translate-y-0 scale-100 '
        // const animationStyle = 'transition duration-1500 ease-in-out ';

        // const signInFormAnimation = animationStyle + (this.state.isSignIn? hide : show );
        // const signOnFormAnimation = animationStyle + (!this.state.isSignIn? hide : show )
        const { isSignIn } = this.state;
        return (
            <div className={'flex lg:flex-row w-full lg:h-full bg-pink-100 flex-col-reverse'}>
                <div className='overflow-hidden w-full my-20 lg:w-3/5 lg:min-w-2/5 lg:my-0 mx-auto h-full flex items-center justify-center'>
                    <PoseGroup >
                        <FlyUpAnimationContainer key='fly' className='w-full flex justify-center'>
                            {isSignIn? 
                                <LoginForm changeForm={this.changeForm} className={' w-4/5 sm:w-1/2 lg:w-4/5 xl:w-3/5 '} onSubmit={values => this.props.userLogInRequest(values)} /> : 
                                <RegistrationForm changeForm={this.changeForm} className=' lg:w-4/5 xl:w-3/5 ' onSubmit={ values => this.props.userRegistrationRequest(values)} />
                            }
                        </FlyUpAnimationContainer>
                    </PoseGroup>
                </div>

                <div className='w-full bg-ocean-500 flex flex-col'>
                    <div className='flex-1 flex flex-col w-full text-center justify-center content-center'>
                        <h1 className='my-4 text-3xl font-extrabold font-black'>
                            Amazing Wireframes
                        </h1>
                        <p className='px-20 text-2xl font-bold text-gray-700'>
                            User Experience & Interface Design, Product Strategy <br />
                            Web Application SaaS Solutions
                        </p>
                    </div>
                    <img className='h-2/3 w-full' src='/static/login-visual.svg' />
                </div>
            </div>
        )
    }

    changeForm = () => {
        console.log('change form button clicked!');
        this.setState({
            isSignIn: !this.state.isSignIn
        })
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    userLogInRequest: (values) => dispatch(userLogInRequest(values)),
    userRegistrationRequest: (data: any) => dispatch(userRegistrationRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
