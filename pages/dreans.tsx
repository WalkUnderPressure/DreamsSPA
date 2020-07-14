import React, { Component } from 'react'
import Layout from '../Layout'
import { connect } from 'react-redux';
// import { getAllUserDreans } from '../redux/actions/UsersDreansActions';
import { List, Map } from 'immutable';
import DreanItem from 'Templates/DreanItem';

interface IDreansProps {
  allDreans: List<Map<string, any>>;
}
interface IDreansState {
    allDreans: List<Map<string, any>>;
}

const DreanBox = (drean: Map<string, any>) => {
    return(
        <div>
          Drean : {drean.get('_id')}
        </div>
    )
}
class Dreans extends Component<IDreansProps, IDreansState> {
  constructor(props: any) {
    super(props)
    this.state = {
        allDreans: List()
    }
  }

  static getInitialProps(ctx) {
    // console.log('getInitialProps!', ctx);
    
    // ctx.store.execSagaTasks(ctx, dispatch => {
    //   dispatch(getAllUserDreans());
    // });
  }

  render() {
    console.log('dreans items : ', this.props.allDreans);
    const element = this.props;
    return (
      <Layout>
        <h1>All Dreans</h1>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    allDreans: state.entities.get('allDreans'),
  })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Dreans)
