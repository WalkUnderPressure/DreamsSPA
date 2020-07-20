import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
// import { getAllUserDreans } from '../redux/actions/UsersDreansActions';
import Table from 'components/Table';
import Layout from 'Layout';

interface IHomeProps {
  user: Map<string, any>,
  tableItems: List<Map<string, any>>
}

interface IHomeState {
  tableItems: List<Map<string, any>>;
}

class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props)
    this.state = {
      tableItems: List()
    }
  }

  render() {
    const user = this.props.user;
    
    return (
      <div>
        <Layout>
          <div className='w-full flex flex-col'>
            <div>
              <h1 className='my-5 text-blue-600 text-3xl text-center'>Welcome to Board of Dreams and Plans</h1>
            </div>
            <div>
              <input type="file" name='uploadAvatar' id='uploadAvatar' />
            </div>            
          </div>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tableItems: state.entities.get('dreans'),
  user: state.identity.get("user")
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)