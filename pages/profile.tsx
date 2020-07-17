import React, { Component } from 'react'
import Layout from '../Layout';
import { connect } from 'react-redux';
import { IIdentity } from 'COMMON';
import PersonalInformation from 'components/PersonalInformation';
import { userUpdateProfile } from '../redux/identity';

interface IProfileProps {
    userInfo: IIdentity,
    userUpdateProfile: (values: any) => void,
}

interface IProfileState {

}

class Profile extends Component<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props)
    this.state = {
        
    }
  }

  static getInitialProps(ctx) {
    // console.log('getInitialProps!', ctx);
    
    // ctx.store.execSagaTasks(ctx, dispatch => {
    //   dispatch(getAllUserDreans());
    // });
  }

  render() {
    const userInfo = this.props.userInfo
    console.log('User Info - ', userInfo);
    // const element = this.props;
    return (
        <Layout>
            <div className="w-full p-4">
                <PersonalInformation user={userInfo} onSubmit={ values => this.props.userUpdateProfile(values)} />
            </div>
        </Layout>
    )
  }
}

const mapStateToProps = (state) => {
    const userInfo = state.identity && state.identity.get('user');
    return ({
        userInfo
    })
}

const mapDispatchToProps = (dispatch) => ({
    userUpdateProfile: (values: any) => dispatch(userUpdateProfile(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
