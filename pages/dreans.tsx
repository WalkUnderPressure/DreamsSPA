import React, { Component } from 'react'
import Layout from '../Layout'
import Table from '../components/Table'
import Link from 'next/link'
import { connect } from 'react-redux';
import DreanItem from '../Templates/DreanItem'
import { getAllUserDreans, deleteUserDrean } from '../redux/actions/UsersDreansActions';

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
    ctx.store.dispatch(getAllUserDreans());
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

const mapStateToProps = (state) => ({
  tableItems: state.entity.dreans,
})

const mapDispatchToProps = (dispatch) => ({
  deleteUserDrean: (id) => dispatch(deleteUserDrean(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dreans)
