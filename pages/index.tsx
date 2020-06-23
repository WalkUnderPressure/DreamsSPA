import React, { Component } from 'react';
import Layout from '../Layout';
import { connect } from 'react-redux';
import { IIdentity } from 'COMMON';

interface IHomeProps {
  user: IIdentity
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
    console.log('index redux props => ', this.props)
    const user = this.props.user;
    const userBlock = () => {
      return(
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "left" }}>
            <h3>{user && user.firstName} {user && user.lastName}</h3>
            <p>Email : {user && user.email}</p>
            <p>Role : {user && user.role}</p>
          </div>
      )
    }
    return (
      <Layout>
        <div>
          <h1 style={{ textAlign: "center", color: "red" }} >Welcome to Dreams And plans Manager</h1>

          {user ? userBlock() : 'You not LogIn!'}
          
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.identity.user
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)