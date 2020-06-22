import React, { Component } from 'react';
import Layout from '../Layout';

import { connect } from 'react-redux';
import Footer from '../components/reduxTest/Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import { getAllUserDreans } from '../redux/actions/UsersDreans';

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount(){
    console.log('index did mount!', this.props);
    this.props.getAllUserDreans;
  }

  render () {
    console.log('index redux props => ', this.props)
    return (
      <Layout>
        <div>
          <h1>Welcome to Dreams And plans Manager</h1>
          <h1>{this.props.currentFilter}</h1>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentFilter: state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllUserDreans: id => dispatch(getAllUserDreans(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default Home;