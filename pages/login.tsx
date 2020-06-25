import React, { Component } from 'react';
import Layout from '../Layout';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';
import { userLogInRequest } from '../redux/actions/UserAuthActions';

interface ILoginProps {
    userLogInRequest: (values) => void;
}

interface ILoginState {

}

class Login extends Component<ILoginProps, ILoginState>{

    render() {
        return (
            <Layout>
                <LoginForm onSubmit={ values => this.props.userLogInRequest(values) } />
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    userLogInRequest: (values) => dispatch(userLogInRequest(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
