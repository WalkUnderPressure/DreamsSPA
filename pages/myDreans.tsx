import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import { connect } from 'react-redux';
// import { getAllUserDreans } from '../redux/actions/UsersDreansActions';
import { List, Map } from 'immutable';
import { DreanEntity } from 'redux/Entity';

interface IMyDreansProps {
  tableItems: List<Map<string, any>>;
}
interface IMyDreansState {
  tableItems: List<Map<string, any>>;
  de: DreanEntity;
}

class MyDreans extends Component<IMyDreansProps, IMyDreansState> {
  constructor(props: any) {
    super(props)
    this.state = {
      tableItems: List(),
      de: new DreanEntity(),
    }
  }

  // static getInitialProps(ctx) {
  //   console.log('getInitialProps call!', ctx);
    
  //   const de = new DreanEntity();
    

  //   // ctx.store.execSagaTasks(ctx, dispatch => {
  //   //   dispatch(getAllUserDreans());
  //   // });
  // }

  componentDidMount(){
    this.state.de.getDreans();
  }

  render() {
    console.log('dreans items : ', this.props.tableItems);
    const element = this.props;
    // const dreansList = Object.values(element.tableItems);
    return (
      <Layout>
        <Table tableName='Dreans' className='w-full p-5 bg-ocean-900 ' data={element.tableItems} />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    tableItems: state.entities.get('dreans'),
  })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDreans)
