import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { getMyDreans } from 'redux/entities/MyDreanEntity';

interface IMyDreansProps {
  tableItems: List<Map<string, any>>;
}
interface IMyDreansState {
  tableItems: List<Map<string, any>>;
}

class MyDreans extends Component<IMyDreansProps, IMyDreansState> {
  constructor(props: any) {
    super(props)
    this.state = {
      tableItems: List(),
    }
  }

  static async getInitialProps(ctx) {
    console.log('getInitialProps call!', ctx);
    ctx.store.execSagaTasks(ctx, (dispatch: any) => {
      ctx.store.dispatch(getMyDreans());
    })
  }

  render() {
    console.log('dreans items : ', this.props.tableItems);
    const element = this.props;
    return (
      <Layout>
        <Table tableName='Dreans' className='w-full p-5 bg-ocean-900 ' data={element.tableItems} />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    tableItems: state.entities.get('myDreans'),
  })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDreans)
