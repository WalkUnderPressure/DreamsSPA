import React, { Component } from 'react';
import Layout from '../Layout';
import { connect } from 'react-redux';

interface IHomeProps {
  user: Map<string, any>
}

interface IHomeState {

}

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props)
    this.state = {
    }
  }

  render() {
    console.log('index redux props => ', this.props.user)
    const user = this.props.user;
    const userBlock = () => {
      return(
        <div className={'text-xl text-red-400'}>
            <h3>{user && user.get("firstName")} {user && user.get("lastName")}</h3>
            <p><span className={'font-bold'}>Email: </span>{user && user.get("email")}</p>
            <p><span className={'font-bold'}>Role: </span>{user && user.get("role")}</p>
          </div>
      )
    }
    return (
      <div>
        <h1 className='my-20 text-blue-600 text-6xl text-center'>Welcome to Board of Dreams and Plans</h1>
        
        {/* <Layout>
        <div className={'h-full p-5 bg-white rounded-tr-full'}>
         
          {user ? userBlock() : 'You not LogIn!'}
        </div>
        </Layout> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.identity.get("user")
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)