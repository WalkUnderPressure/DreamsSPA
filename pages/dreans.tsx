import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import Link from 'next/link'
import { connect } from 'react-redux';
import { getAllUserDreans } from '../redux/actions/UsersDreansActions';
import { List } from 'immutable';

interface IDreansProps {
  tableItems: List<Map<string, any>>;
}
interface IDreansState {
  tableItems: List<Map<string, any>>;
}

class Dreans extends Component<IDreansProps, IDreansState> {
  constructor(props: any) {
    super(props)
    this.state = {
      tableItems: List()
    }
  }

  static getInitialProps(ctx) {
    // console.log('getInitialProps!', ctx);
    
    ctx.store.execSagaTasks(ctx, dispatch => {
      dispatch(getAllUserDreans());
    });
  }

  render() {
    console.log('dreans items : ', this.props.tableItems);
    const element = this.props;
    return (
      <Layout>
        <Table data={element.tableItems} />
        <Link href='/redact/[id]' as='/redact/add'><a>Add</a></Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dreans)
