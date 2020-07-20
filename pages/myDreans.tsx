import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { ENTITIES } from '../COMMON';
import Entity from 'redux/entities/Entity';
// import { getMyDreans } from 'redux/entities/DreanEntity';
const getMyDreans = Entity.getSagaAction("DreansEntity",'getMyDreans')

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
    ctx.store.execSagaTasks(ctx, (dispatch: any) => {
      ctx.store.dispatch(getMyDreans());
    })
  }

  render() {
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
        <div className='w-full p-4'>
          <Table tableName='Dreans' tableFields={tableFields} createItemLink='redact' className='w-full p-5 bg-ocean-900 ' data={element.tableItems} />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const dreans: List<any> = state.entities.get(ENTITIES.DREANS);
  const currentUser = state.identity.get('user');
  const userId = currentUser && currentUser.get('userId');
  
  const filteredDreans = dreans && dreans.filter((item) => {
    return item.get('owner') === userId
  });
  
  return ({
    tableItems: filteredDreans,
  })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDreans)
