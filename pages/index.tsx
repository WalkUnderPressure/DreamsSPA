import React, { Component } from 'react';
import Layout from '../Layout';
import store from 'store';

import { connect } from 'react-redux';
import Footer from '../components/reduxTest/Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import { getAllUserDreans, userDreansActionsList } from '../redux/actions/UsersDreans';

interface IHomeProps {
  getAllUserDreans: (id:string) => void;
  currentFilter: any;
}

class Home extends Component<IHomeProps> {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    console.log('index redux props => ', this.props)
    return (
      <Layout>
        <div>
          <h1>Welcome to Dreams And plans Manager</h1>
          <button onClick={this.getDreans}>Get Dreans</button>
          {/* <h1>{this.props.currentFilter}</h1> */}
          {/* <AddTodo /> */}
          {/* <VisibleTodoList /> */}
          {/* <Footer /> */}
        </div>
      </Layout>
    )
  }
  
  getDreans = () => {
    console.log("getDreans => ");
    const userId = store.get('userId');
    this.props.getAllUserDreans(userId);
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentFilter: state.visibilityFilter
})


export default connect(mapStateToProps, {getAllUserDreans})(Home)
// export default Home;