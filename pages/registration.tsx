import React, { Component } from 'react';
import Layout from '../Layout';
import { connect } from 'react-redux';
import { userRegistrationRequest } from '../redux/actions/UserAuthActions';
import RegistrationForm from '../components/RegistrationForm'; 

interface IRegistrationProps { 
    userRegistrationRequest: (data: any) => void;
}

interface IRegistrationState {

}

class Registration extends Component<IRegistrationProps, IRegistrationState>{

    render() {
        return (
            <Layout>
                <RegistrationForm onSubmit={ values => this.props.userRegistrationRequest(values)}/>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    userRegistrationRequest: (data: any) => dispatch(userRegistrationRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)