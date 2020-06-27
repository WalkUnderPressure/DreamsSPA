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
        <div>
            <h3>{user && user.get("firstName")} {user && user.get("lastName")}</h3>
            <p>Email : {user && user.get("email")}</p>
            <p>Role : {user && user.get("role")}</p>
          </div>
      )
    }
    return (
      <Layout>
        <div>
         <h1 className='text-yellow-600'>Welcome to Dreams And Plans Manager</h1>
          {user ? userBlock() : 'You not LogIn!'}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.identity.get("user")
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)