import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import Link from 'next/link'
import { connect } from 'react-redux';
import DreanItem from '../Templates/DreanItem'
import { getAllUserDreans, deleteUserDrean } from '../redux/actions/UsersDreansActions';
import { List } from 'immutable';

interface IDreansProps {
  deleteUserDrean: (id) => void;
  tableItems: Array<DreanItem>;
}
interface IDreansState {
  tableItems: Array<DreanItem>;
}

class Dreans extends Component<IDreansProps, IDreansState> {
  constructor(props: any) {
    super(props)
    this.state = {
      tableItems: []
    }
  }

  static getInitialProps(ctx) {
    // console.log('getInitialProps!', ctx);
    
    ctx.store.execSagaTasks(ctx, dispatch => {
      dispatch(getAllUserDreans());
    });
  }

  handleItemDelete = (id: string) => {
    this.props.deleteUserDrean(id);
  }

  render() {
    console.log('props table items : ', this.props.tableItems);
    const element = this.props;
    return (
      <Layout>
        <Table data={element.tableItems} handleItemDelete={this.handleItemDelete} />
        <Link href='/redact/[id]' as='/redact/add'><a>Add</a></Link>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('map state to props ---> ', state);
  // const data = state.getIn(['entity', 'dreans']);
  // const www = state.entity.get('dreans');
  const www = state.entity.getIn(['dreans']);
  console.log('www ', www);
  // console.log('data ', data);
  return ({
    tableItems: state.entity.getIn(['dreans']),
  })
}

const mapDispatchToProps = (dispatch) => ({
  deleteUserDrean: (id) => dispatch(deleteUserDrean(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dreans)
