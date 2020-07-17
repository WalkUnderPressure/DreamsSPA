import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { getMyDreans } from 'redux/entities/MyDreanEntity';
import { ENTITIES } from '../COMMON';

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
    const tableFields: string[] = [
      'Code Name',
      'Description',
      'Date',
      'Guests',
      'Need Things',
      'Access',
      'ACTION',
    ]
    return (
      <Layout>
        <Table tableName='Dreans' tableFields={tableFields} className='w-full p-5 bg-ocean-900 ' data={element.tableItems} />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const dreans: List<any> = state.entities.get(ENTITIES.DREANS);
  console.log('State - ', state);
  const currentUser = state.identity.get('user');
  const userId = currentUser && currentUser.get('userId');
  console.log('user ID = ', userId);

  const filteredDreans = dreans && dreans.filter((item) => {
    console.log("item - ", item);
    return item.get('owner') === userId
  });
  console.log('Filtered dreans - ', filteredDreans);

  return ({
    tableItems: filteredDreans,
  })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDreans)
