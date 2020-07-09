import React, { Component } from 'react'
import Layout from '../Layout';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';

interface INewsProps {

}

interface INewsState {

}

class News extends Component<INewsProps, INewsState> {
  constructor(props: INewsProps) {
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
    // console.log('dreans items : ', this.props.tableItems);
    // const element = this.props;
    return (
      <Layout>
          <h1>News</h1>

          {/* <Table tableName='Dreans' className='w-full p-5 bg-ocean-500 ' data={element.tableItems} /> */}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
//   return ({
//     tableItems: state.entity.get('dreans'),
//   })
    return ({
        
    })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
