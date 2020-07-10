import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import { connect } from 'react-redux';
import { getAllUserDreans } from '../redux/actions/UsersDreansActions';
import { List, Map } from 'immutable';
import { DreanEntity } from 'redux/Entity';

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
      tableItems: List()
    }
  }

  static getInitialProps(ctx) {
    console.log('getInitialProps call!');
    
    const de = new DreanEntity();
    de.getDreans();

    ctx.store.execSagaTasks(ctx, dispatch => {
      dispatch(getAllUserDreans());
    });
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
    tableItems: state.entity.get('dreans'),
  })
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDreans)
