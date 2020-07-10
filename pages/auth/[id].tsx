import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm';

import { connect } from 'react-redux';
import { userLogInRequest } from '../../redux/actions/UserAuthActions';
import { userRegistrationRequest } from '../../redux/actions/UserAuthActions';

import posed, { PoseGroup } from "react-pose";
import Layout from 'Layout';
import { withRouter, SingletonRouter } from 'next/router';


const Modal = posed.div({
    enter: {
        y: 0,
        opacity: 1,
        scale: 1,
        delay: 300,
        transition: {
            y: { type: "spring", stiffness: 80, damping: 100 },
            scale: { delay: 600 },
            default: { duration: 1050 }
        }
    },
    exit: {
        y: 100,
        opacity: 0,
        scale: 0.85,
        transition: { duration: 300 }
    }
});


interface ILoginProps {
    userLogInRequest: (values) => void;
    userRegistrationRequest: (data: any) => void;
    router?: SingletonRouter; 
}

interface ILoginState {
    isSignIn: boolean;
}
class Login extends Component<ILoginProps, ILoginState>{
    constructor(props: ILoginProps){
        super(props);
        this.state = {
            isSignIn: true,
        }
    }
    

    public static async getInitialProps(ctx: any) {
        console.log('auth props ===>> ', ctx);
        // let id: any = null;
        // await ctx.store.execSagaTasks(ctx, (dispatch: any) => {
        //     id = ctx?.req?.params?.id ? ctx.req.params.id : ctx.query.id;
        //     ctx.store.dispatch(redactDreanRequest(id));
        // })
        // return {id}
    }

    render() {
        console.log('render auth props ===>> ', this.props);

        const { router: { query } } = this.props;
        const id = query.id;

        const isSignIn: boolean = id === 'login';
        
        const pageIndex = isSignIn? 1 : 2;
        
        const pageOne = <LoginForm changeForm={this.changeForm} className={' w-4/5 sm:w-1/2 lg:w-4/5 xl:w-3/5 '} onSubmit={values => this.props.userLogInRequest(values)} />;
        const pageTwo = <RegistrationForm changeForm={this.changeForm} className=' lg:w-4/5 xl:w-3/5 ' onSubmit={ values => this.props.userRegistrationRequest(values)} />;
        const modalPage = isSignIn? pageOne : pageTwo;

        return (
            <div className={'flex lg:flex-row w-full lg:h-full bg-pink-100 flex-col-reverse'}>
                {/* flex lg:flex-row w-full h-screen flex-col-reverse bg-pink-100 */}
                <div className='w-full my-20 lg:w-3/5 lg:min-w-2/5 lg:my-0 mx-auto flex items-center  justify-center'>
                    <PoseGroup>
                        <Modal key={`modal_${pageIndex}`} className='w-full flex justify-center align-middle'>
                            {modalPage}
                        </Modal>
                    </PoseGroup>
                    {/* <PopUpMessage
                        type={PopUpMessageTypes.SUCCESS}
                        title="Thank you!"
                        id="001">
                        We have received your application. Check your email in a few weeks to find out if you’ve been admitted.
                    </PopUpMessage> */}
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

    // onClickY = () => {
    //     console.log('Click Y!')
    //     this.setState({
    //         isSignIn: !this.state.isSignIn
    //     })
    // }

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

const LoginConnect = connect(mapStateToProps, mapDispatchToProps)(Login)

// @ts-ignore
export default withRouter(LoginConnect)
