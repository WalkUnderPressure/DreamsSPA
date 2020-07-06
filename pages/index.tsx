import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { getAllUserDreans } from '../redux/actions/UsersDreansActions';
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

  static getInitialProps(ctx) {
    // console.log('getInitialProps!', ctx);
    
    ctx.store.execSagaTasks(ctx, dispatch => {
      dispatch(getAllUserDreans());
    });
  }

  render() {
    console.log('dreans items : ', this.props.tableItems);
    console.log('index redux props => ', this.props.user);

    const user = this.props.user;
    const element = this.props;
    
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
        <h1 className='my-5 text-blue-600 text-3xl text-center'>Welcome to Board of Dreams and Plans 0001 </h1>
        <Layout>
          <div>
            <div className={'h-full p-5 bg-white'}>
            {user ? userBlock() : 'You not LogIn!'}
          </div>
          <div className='bg-white'>
            <Table tableName='Dreans' data={element.tableItems} />
          </div>
          </div>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tableItems: state.entity.get('dreans'),
  user: state.identity.get("user")
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)